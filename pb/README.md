## Deployment

I'm deploying the pocketbase db through [fly.io](https://fly.io/docs/flyctl/install/)

To set up deployment:

1. cd into the `pb` directory
2. Run `flyctl launch --build-only`
3. Run `flyctl volumes create pb_data --size=1`
   > I'm ignoring the `Warning! Every volume is pinned to a specific physical host. You should create two or more volumes per application to avoid downtime. Learn more at https://fly.io/docs/volumes/overview/`
4. Open `fly.toml` and at the root level add:
   ```
   [mounts]
   destination = "/pb/pb_data"
   source = "pb_data"
   ```
5. run `flyctl deploy`
   To access your PocketBase dashboard navigate to
   `https://YOUR_APP_NAME.fly.dev/_/`

### New deployments

To deploy new configuration/image changes, just run `flyctl deploy` again.

---

## Backup and downloading a copy of your pb_data

Fly.io will even create a daily snapshot automatically for your volume (it will be kept for 5 days) - https://fly.io/docs/reference/volumes/#snapshots-and-restores.

To download a copy of your remote pb_data directory to your local machine, you could run the following commands in 2 separate terminals:

````# this will register a ssh key with your local agent (if you haven't already)
flyctl ssh issue --agent

    # proxies connections to a fly VM through a Wireguard tunnel
    flyctl proxy 10022:22

    # run in a separate terminal to copy the pb_data directory
    scp -r -P 10022 root@localhost:/pb/pb_data  /your/local/pb_data
    ```
````
