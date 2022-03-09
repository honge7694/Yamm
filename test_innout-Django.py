import io
import os
import json
import argparse
import cv2
import matplotlib.pyplot as plt
import matplotlib.patches as patches


from torchvision import models
from torchvision import transforms
from PIL import Image
# from django.conf import settings # When you use Django, turn ON
from models import *  # set ONNX_EXPORT in models.py
from utils.datasets import *
from utils.utils import *


def set_model():
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

    #global opt
    opt, _ = parser.parse_known_args()
    opt.cfg = check_file(opt.cfg)  # check file
    opt.names = check_file(opt.names)  # check file

    #global model
    model = Darknet(opt.cfg, (320, 192))
    
    model.cuda()

    state_dict = torch.load(opt.weights)
    state_dict = state_dict['model']
    new_state_dict = {key:state_dict[key] for key in state_dict.keys() if 'total' not in key}
    model.load_state_dict(new_state_dict)

    model.eval()

#    return [opt, model]??


def preference_image(img):
    img = cv2.imread('test_2-2.jpg')
    img_org = img[..., ::-1].copy() # BGR 이미지 -> RGB 이미지 원본이미지 저장
    img = cv2.resize(img, dsize=(320, 192))
    img = torch.from_numpy(img[..., ::-1].copy())
    img = img.permute(2, 0, 1)
    img = img[None, ...]
    img = img / 255.0


    res = model(img.cuda())
    pred = non_max_suppression(res[0], conf_thres=0.3, iou_thres=0.5,
                               multi_label=False, classes=opt.classes, agnostic=opt.agnostic_nms)

    det = pred[0]
    det[:, :4] = scale_coords(img.shape[2:], det[:, :4], img_org.shape).round()


    x1, y1, x2, y2 = det[0, :4]
    x, y, w, h = int(x1), int(y1), int(x2-x1), int(y2-y1)


    confidence = det[0, 4].item()
    label = int(det[0, 5])
    
    return [x, y, w, h, confidence, label]


#fig, ax = plt.subplots()
#ax.imshow(img_org)
#ax.add_patch(
#    patches.Rectangle(
#        (x, y), w, h, edgecolor = 'blue', facecolor='red', fill=False
#    )
#
#)

#ax.annotate(f"{label}({confidence:.2f})", (x-10, y-10), color='r', fontsize=15)

#plt.show()


# # import ==> function

# json_path = os.path.join(settings.STATIC_ROOT, "imagenet_class_index.json")
# imagenet_mapping = json.load(open(json_path))


# def transform_image(image_bytes):
#     my_transforms = transforms.Compose([transforms.Resize(255),
#                                         transforms.CenterCrop(224),
#                                         transforms.ToTensor(),
#                                         transforms.Normalize(
#                                             [0.485, 0.456, 0.406],
#                                             [0.229, 0.224, 0.225])])
#     image = Image.open(io.BytesIO(image_bytes))
#     return my_transforms(image).unsqueeze(0)


# def get_prediction(image_bytes):
#     tensor = transform_image(image_bytes)
#     outputs = model.forward(tensor)
#     _, y_hat = outputs.max(1)
#     predicted_idx = str(y_hat.item())
#     class_name, human_label = imagenet_mapping[predicted_idx]
#     return human_label
