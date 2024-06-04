from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import db, Comment, Cocktail
from app.forms.comment_form import CommentForm

comment_routes = Blueprint('comments', __name__)



@comment_routes.route('/comments', methods=['GET'])
def get_comments():
    comments = Comment.query.all()
    return jsonify([comment.to_dict() for comment in comments]), 200

@comment_routes.route('/cocktails/<int:cocktail_id>/comments', methods=['POST'])
@login_required
def create_comment(cocktail_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        
        existing_comment = Comment.query.filter_by(user_id=current_user.id, cocktail_id=cocktail_id).first()
        if existing_comment:
            return jsonify({'error': 'You have already commented on this cocktail'}), 400
        
        content = form.content.data
        comment = Comment(content=content, user_id=current_user.id, cocktail_id=cocktail_id)
        db.session.add(comment)
        db.session.commit()
        return jsonify(comment.to_dict()), 201
    return jsonify({'errors': form.errors}), 400


@comment_routes.route('/comments/<int:id>', methods=['PUT'])
@login_required
def update_comment(id):
    comment = Comment.query.get(id)
    if comment.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 401
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment.content = form.content.data
        db.session.commit()
        return jsonify(comment.to_dict()), 200
    return jsonify({'errors': form.errors}), 400

@comment_routes.route('/comments/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    if comment.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 401
    db.session.delete(comment)
    db.session.commit()
    return jsonify({'message': 'Comment deleted'}), 200
