

# Infotel BlueIOS Assets locator mobile

Applicazione Crossplatform per la ricerca indoor di Assets


## Avvio

To start this project run on your machine

```bash
  docker compose build
  docker compose up
```


## API Reference

#### Swagger documentation

```http
  GET /api/docs
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none` | | |

#### Healthcheck

```http
  GET /api/healthcheck
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |


#### Get all assets

```http
  GET /api/assets
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get a single asset

```http
  GET /api/assets/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.

