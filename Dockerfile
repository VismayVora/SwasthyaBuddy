FROM python:3.8-slim-buster

COPY . /app

WORKDIR /app

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

EXPOSE 8080 

ENTRYPOINT [ "python" ] 

CMD [ "app.py" ]