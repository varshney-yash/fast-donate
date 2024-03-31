FROM python:3.9-slim

WORKDIR /app

RUN pip install poetry

COPY pyproject.toml poetry.lock* /app/

RUN poetry config virtualenvs.create false

RUN poetry install --no-root --no-dev

COPY . /app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--reload"]
