from flask import jsonify

from backend import app


@app.route('/addWebsite', methods=['GET'])
def add_website():

    print("WORKS")
    # data = request.get_json()
    #
    # new_comment = Sites(name=data['name'],
    #                       text=data['text'],
    #                       track_id=data['track_id'])
    #
    # db.session.add(new_comment)
    # db.session.commit()

    return jsonify({'message': 'New comment created.'})
