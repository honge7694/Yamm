FROM python:3.10.2

# 파이썬 에러가 나면  도커 터미널에서 볼 수 있게 한다.
ENV PYTHONUNBUFFERED=1

WORKDIR /srv/app

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY . .

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]

