# DevTinder API's
 
## authRouter
-POST /signup
-POST /login
-POST /logout

## profileRouter
-GET profile/view
-PATCH profile/edit
-PATCH profile/password

## connectionRequestRouter
POST /request/send/:status/:userId
POST /request/review/:status/:userId

## userRouter
GET /user/requests/received
GET /user/connections
GET /user/feed -gets you the profiles of the users on the platform




