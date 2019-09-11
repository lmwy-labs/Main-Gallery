# Project Name

> Gallery component for LMWY Labs - Restaurant Page

## Related Projects

  - https://github.com/lmwy-labs/Right-Reservations
  - https://github.com/lmwy-labs/Main-Reviews

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage
> To seed database, use "npm run seed"
> To create bundle, use "npm build"
> To start server, use "npm start"
> This component uses port 3002
> In db/seed.js (line 4) and db/index.js (line 3), change database to localhost, if running on your local proxy server
> Important! Styled components will not work without a CDN
> Gallery component is in the global scope, so make sure to render it 

## Requirements
- Node 6.13.0

## Development
### Installing Dependencies

From within the root directory:

```sh
npm install
```
## RESTful CRUD API
GET - '/api/restaurants/:rid/images'

POST - '/api/restaurants/:rid/images'

PUT - '/api/restaurants/:rid/images'

DELETE - '/api/restaurants/:rid/images'
