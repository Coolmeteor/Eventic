class UserIdNotFoundFromTokenError(Exception):
    def __init(self, message="User ID not found using access token"):
        super().__init__(message)