"""update model

Revision ID: 1914cee21519
Revises: 68b3b50675a2
Create Date: 2025-02-24 14:26:08.442637

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1914cee21519'
down_revision: Union[str, None] = '68b3b50675a2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('profiles', sa.Column('image_url', sa.LargeBinary(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('profiles', 'image_url')
    # ### end Alembic commands ###
