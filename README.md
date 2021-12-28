# can i surf?

An application designed to answer a simple question many desk jockeys ask themselves daily, "Can I surf today?". This app intends to solve this by allowing a user to select where they are and their available time window for that day and receive a few best bets given the parameters. Along with those best bets, you will see a more detailed time based forecast for thee chosen location. Ideally this takes most of the guess work out of deciding when and where to surf for those poor souls who only have a few minutes to get in the water. For ease of access, this will be designed with a mobile browser in mind. That being said, I don't intend to share this out too much to avoid crowding spots.

## Navigating the repo

This repo contains the server side (server directory) and client side (client directory) code.

## Surf forecasting data

The data used to power this application is from [Magic Seaweed's public api](https://magicseaweed.com/docs/developers/59/api/9905/).

## About the author

I am an [engineering manager](https://github.com/phantomphildius/manager-readme) at [Betterment](https://betterment.com). I miss coding daily, writing typescript, and surfing everyday. This project is intended to help me scratch at least one of these itches at a time.

## Feature Requests

Please fork the repo and open a pull request or leave an open issue for bugs or feature requests.

## Setting up the project

To set up and confirm everything is working install node version 14 and follow the instructions below

```sh
# using the github cli
gh repo clone phantomphildius/can-i-surf
cd can-i-surf
yarn
cd client && yarn test
cd server && yarn test --watch
```

To develop locally request [an api key](https://magicseaweed.com/docs/developers/59/sign-up/9908/) after reading and agreeing to the [terms and conditions](https://magicseaweed.com/docs/developers/59/terms-and-conditions/9906/). Then follow the below instructions and fill in your key

```sh
cd server
touch .env
vi .env

# ./server/.env
magic_seaweed_api_key=YOUR_KEY_HERE
```
