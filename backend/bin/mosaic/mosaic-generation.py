import sys
from cv2 import cv2
import numpy as np
import os
from bing_image_downloader import downloader

KERNEL_SIZE = (30, 30)
NUM2DOWNLOAD = 50

def pickBestPattern(patt_imgs, x, y, image):
    pic_errors = []
    for pic in patt_imgs:
        error_array = abs(pic - image[y:y+KERNEL_SIZE[1], x:x+KERNEL_SIZE[0]])
        error_array = error_array.flatten()
        error = error_array.sum()
        pic_errors.append(error)
    min_index = pic_errors.index(min(pic_errors))
    pic = patt_imgs[min_index]
    image[y:y+KERNEL_SIZE[1], x:x+KERNEL_SIZE[0]] = pic


def createCollage(largeImagePath, keyword, IMAGE_REPO_PATH):
    # Read in image to modify
    large_image = cv2.imread(largeImagePath)
    large_image = np.asarray(large_image, dtype=np.float)

    # Search for images on bing
    downloader.download(
        keyword,
        limit=NUM2DOWNLOAD,
        output_dir=IMAGE_REPO_PATH,
        adult_filter_off=True,
        force_replace=True,
        timeout=60
    )

    # Read in images in repo
    patt_imgs = []
    for patt_img in os.listdir(IMAGE_REPO_PATH + '/' + keyword):
        try:
            filepath = IMAGE_REPO_PATH + '/' + keyword + '/' + patt_img
            img = cv2.imread(filepath)
            img = cv2.resize(img, KERNEL_SIZE)
            img = np.asarray(img, dtype=np.float)
            patt_imgs.append(img)
        except:
            pass

    # Start modifying image
    for y in range(0, large_image.shape[0] - KERNEL_SIZE[1]+1, KERNEL_SIZE[1]):
        for x in range(0, large_image.shape[1] - KERNEL_SIZE[0]+1, KERNEL_SIZE[0]):
            pickBestPattern(patt_imgs, x, y, large_image)
    
    # Write out modified image
    cv2.imwrite(IMAGE_REPO_PATH + '/output.png', large_image)


if __name__ == '__main__':
    bingSearch = sys.argv[1]
    imgPath = sys.argv[2]
    randomKey = sys.argv[3]

    IMAGE_REPO_PATH = 'bin/mosaic/public/' + str(randomKey)

    createCollage(
        imgPath,
        bingSearch,
        IMAGE_REPO_PATH
    )