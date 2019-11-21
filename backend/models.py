from . import db


class Site(db.Model):
    """Model for user accounts."""

    __tablename__ = 'sites'
    id = db.Column(db.Integer,
                   primary_key=True)
    url = db.Column(db.String(64),
                         index=False,
                         unique=True,
                         nullable=False)
    created = db.Column(db.DateTime,
                        index=False,
                        unique=False,
                        nullable=False)

    def __repr__(self):
        return '<Sire {}>'.format(self.url)
