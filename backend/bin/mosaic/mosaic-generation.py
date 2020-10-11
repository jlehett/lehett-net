import sys
from cv2 import cv2
import numpy as np
import os
from bing_image_downloader import downloader


def pickBestPattern(patt_imgs, x, y, image, tilingImageScale):
    pic_errors = []
    for pic in patt_imgs:
        error_array = abs(pic - image[y:y+tilingImageScale, x:x+tilingImageScale])
        error_array = error_array.flatten()
        error = error_array.sum()
        pic_errors.append(error)
    min_index = pic_errors.index(min(pic_errors))
    pic = patt_imgs[min_index]
    image[y:y+tilingImageScale, x:x+tilingImageScale] = pic


def createCollage(
    largeImagePath,
    keyword,
    numImages,
    tilingImageScale,
    outputImageScale,
    IMAGE_REPO_PATH
):
    # Read in image to modify
    large_image = cv2.imread(largeImagePath)
    # We must resize the image according to the user's specifications
    # while also ensuring the final image is of the appropriate scale
    # in the x and y scale
    large_image = cv2.resize(
        large_image,
        (
            int(large_image.shape[1] * outputImageScale),
            int(large_image.shape[0] * outputImageScale)
        )
    )
    tilingImages = (
        int(large_image.shape[0] / tilingImageScale),
        int(large_image.shape[1] / tilingImageScale)
    )
    large_image = large_image[
        :tilingImages[0]*tilingImageScale,
        :tilingImages[1]*tilingImageScale
    ]
    large_image = np.asarray(large_image, dtype=np.float)

    # Search for images on bing
    downloader.download(
        keyword,
        limit=numImages,
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
            img = cv2.resize(img, (tilingImageScale, tilingImageScale))
            img = np.asarray(img, dtype=np.float)
            patt_imgs.append(img)
        except:
            pass

    # Start modifying image
    for y in range(0, large_image.shape[0] - tilingImageScale+1, tilingImageScale):
        for x in range(0, large_image.shape[1] - tilingImageScale+1, tilingImageScale):
            pickBestPattern(patt_imgs, x, y, large_image, tilingImageScale)
    
    # Write out modified image
    cv2.imwrite(IMAGE_REPO_PATH + '/output.png', large_image)


if __name__ == '__main__':
    bingSearch = sys.argv[1]
    imgPath = sys.argv[2]
    randomKey = sys.argv[3]
    numImages = int(sys.argv[4])
    tilingImageScale = int(sys.argv[5])
    outputImageScale = float(sys.argv[6])

    IMAGE_REPO_PATH = 'bin/mosaic/public/' + str(randomKey)

    createCollage(
        imgPath,
        bingSearch,
        numImages,
        tilingImageScale,
        outputImageScale,
        IMAGE_REPO_PATH
    )