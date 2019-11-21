from flask import request, render_template, make_response
from datetime import datetime as dt
from flask import current_app as app
from .models import db, Site


@app.route('/addURL', methods=['GET'])
def create_site():
    """Create a site."""
    #url = request.args.get('url')
    url = "google.com"
    if url:
        existing_url = Site.query.filter(Site.url == url).first()
        if existing_url:
            return make_response('This site is already added!')
        new_site = Site(url=url,
                        created=dt.now()
                        )  # Create an instance of the Site class
        db.session.add(new_site)  # Adds new User record to database
        db.session.commit()  # Commits all changes
    return make_response("Your site successfully added!")
