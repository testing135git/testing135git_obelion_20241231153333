markdown
# HiApp API Documentation

## Base URL
`https://hiapp-backend.cloud-stacks.com/api/(endpoint)`

## Authentication Routes

### 1. Login
- **Endpoint:** `/auth/login`
- **Method:** POST
- **Description:** User login with credentials.

### 2. Register
- **Endpoint:** `/auth/register`
- **Method:** POST
- **Description:** User registration with details.

## User Management Routes

### 1. Get User Profile
- **Endpoint:** `/user/profile`
- **Method:** GET
- **Description:** Retrieve the profile of the logged-in user.

### 2. Update User Profile
- **Endpoint:** `/user/profile`
- **Method:** PUT
- **Description:** Update the profile details of the logged-in user.

## Notes
- All endpoints are prefixed with `/api`.
- Ensure that requests are made to the appropriate endpoint based on the desired action.
- Authentication may be required for certain endpoints.
