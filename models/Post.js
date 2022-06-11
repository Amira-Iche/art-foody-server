module.exports = (sequelize,DataTypes) => {

    const Posts = sequelize.define("Posts", {
        image : {
            type: DataTypes.STRING,
        },
        title : {
            type: DataTypes.STRING,
            allowNul: false,
        },
        postText : {
            type: DataTypes.STRING,
            allowNul: false,
        },
        username : {
            type: DataTypes.STRING,
            allowNul: true,
        }
    })



    Posts.associate = (models) => {
        Posts.hasMany(models.Comments,{
        onDelete : "cascade"
        })

        Posts.hasMany(models.Likes,{
            onDelete : "cascade"
        })
    }

    return Posts
}