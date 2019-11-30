from flask import request, render_template, make_response
from datetime import datetime as dt
from flask import current_app as app
from .models import db, Site


@app.route('/addURL', methods=['GET'])
def create_site():
    """Create a site."""
    url = request.args.get('url')
    if url:
        existing_url = Site.query.filter(Site.url == url).first()
        if existing_url:
            return make_response('This site is already added!')
        new_site = Site(url=url, created=dt.now())
        db.session.add(new_site)
        db.session.commit()
    return make_response("Your site successfully added!")


@app.route('/fetchURL', methods=['GET'])
def fetch_site():
    """Fetch a site."""
    url = request.args.get('url')
    if url:
        existing_url = Site.query.filter(Site.url == url).first()
        if existing_url:
            return make_response('This site is blacklisted!')
    return make_response("The site is safe and not blacklisted!")

