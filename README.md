# mockbank

Mockbank is a dummy application that can be used to simulate a real world production app when setting up IT infrastructure. It keeps track of the company's balance, and balance can be added or subtracted. It also shows the latest transactions.

## Docker instructions

```
docker build . -t <username>/mock
docker run --network="host" -d <username>/mock
```

The host network mode is required since the application runs on the localhost. Alternatively, the Express IP can be changed to something like `0.0.0.0`, which would allow using the bridge networking mode and setting custom ports.
