# Setup

## Virtial Environment
```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install python3-pip
sudo pip install virtualenv
virtualenv -p python3 .venv
source .venv/bin/activate
```
## Django
```bash
.venv/bin/python -m pip install Django
django-admin startproject myproject . 

```

```bash
.venv/bin/python manage.py runserver
```

```bash
.venv/bin/python manage.py startapp mybible
```
