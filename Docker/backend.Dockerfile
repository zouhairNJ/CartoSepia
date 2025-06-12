FROM python:3.11-slim
WORKDIR /app
COPY backend/ /app
RUN pip install -r requirements.txt
CMD ["gunicorn", "myproject.wsgi:application", "--bind", "0.0.0.0:8000"]
