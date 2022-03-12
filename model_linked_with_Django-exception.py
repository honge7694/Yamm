#!/usr/bin/env python
# coding: utf-8

# # MODEL => MODULE
# ## input
# - `img` <= input data(image) from Front-end
# 
# ## output
# - `confidence` => percentile (%)
# - `label` => food name
# 
# ### Exception (Not a food)
# [confidence, label] = [0, 9999]
# 

# In[2]:


import io
import os
import json

from torchvision import models
from torchvision import transforms
from PIL import Image
# from django.conf import settings # when using Django

import argparse

from models import *  # set ONNX_EXPORT in models.py
from utils.datasets import *
from utils.utils import *

import cv2


class Config:
    def parameters():
        parser = argparse.ArgumentParser()
        parser.add_argument('--cfg', type=str, default='cfg/yolov3-spp-403cls.cfg', help='*.cfg path')
        parser.add_argument('--names', type=str, default='data/403food.names', help='*.names path')
        parser.add_argument('--weights', type=str, default='weights/best_403food_e200b150v2.pt', help='weights path')
        parser.add_argument('--source', type=str, default='data/samples', help='source')  # input file/folder, 0 for webcam
        parser.add_argument('--output', type=str, default='output', help='output folder')  # output folder
        parser.add_argument('--img-size', type=int, default=512, help='inference size (pixels)')
        parser.add_argument('--conf-thres', type=float, default=0.3, help='object confidence threshold')
        parser.add_argument('--iou-thres', type=float, default=0.6, help='IOU threshold for NMS')
        parser.add_argument('--fourcc', type=str, default='mp4v', help='output video codec (verify ffmpeg support)')
        parser.add_argument('--half', action='store_true', help='half precision FP16 inference')
        parser.add_argument('--device', default='', help='device id (i.e. 0 or 0,1) or cpu')
        parser.add_argument('--view-img', action='store_true', help='display results')
        parser.add_argument('--save-txt', action='store_true', help='save results to *.txt')
        parser.add_argument('--classes', nargs='+', type=int, help='filter by class')
        parser.add_argument('--agnostic-nms', action='store_true', help='class-agnostic NMS')
        parser.add_argument('--augment', action='store_true', help='augmented inference')

        opt, _ = parser.parse_known_args()

        return opt
    
params = Config.parameters()


def Model():
    model = Darknet(params.cfg, (320, 192))
    model.cuda()
    
    # loading the Model
    state_dict = torch.load(params.weights)
    state_dict = state_dict['model']
    new_state_dict = {key:state_dict[key] for key in state_dict.keys() if 'total' not in key}
    model.load_state_dict(new_state_dict)
    model.eval() # on Model
    return model

run = Model()


# img = cv2.imread('test_5-2.jpg') # <=불필요한 코드 삭제
def inputdata(img):
    #preprocessing
    img_org = img[..., ::-1].copy()
    img = cv2.resize(img, dsize=(320, 192))
    img = torch.from_numpy(img[..., ::-1].copy())
    img = img.permute(2, 0, 1)
    img = img[None, ...]
    img = img / 255.0

    res = run(img.cuda())
    pred = non_max_suppression(res[0], conf_thres=0.3, iou_thres=0.5,
                               multi_label=False, classes=params.classes, agnostic=params.agnostic_nms)
    if pred == [None]:
        confidence = 0
        label = 9999
    else:
        det = pred[0]
        det[:, :4] = scale_coords(img.shape[2:], det[:, :4], img_org.shape).round()

        x1, y1, x2, y2 = det[0, :4]
        x, y, w, h = int(x1), int(y1), int(x2-x1), int(y2-y1)

        confidence = det[0, 4].item()
        label = int(det[0, 5])

    return [round(confidence * 100, 2), label]


# # code test
# res = inputdata(img)
# print(res)

