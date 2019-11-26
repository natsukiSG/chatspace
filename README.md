　readme

チャットスペース（chat-space）

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
------------------------------
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false,unique :true|
|name|string|null: false,unique :true|
### Association
- has_many :messages
- has_many :groups_users
- has_many :groups, through::group_users
------------------------------
## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique :true, index|

### Association
- has_many :messages
- has_many :groups_users
- has_many :users through::groups_users
------------------------------
## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|user_id|integer|null: false, foreign_key: true|
|image|integer||
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
------------------------------