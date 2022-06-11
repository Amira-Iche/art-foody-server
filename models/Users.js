module.exports = (sequelize,DataTypes) => {

    const Users = sequelize.define("Users", {
      
        username : {
            type: DataTypes.STRING,
            allowNul: false,
        },
        password : {
            type: DataTypes.STRING,
            allowNul: false,
        }
    })



    Users.associate = (models) => {
        Users.hasMany(models.Likes,{
        onDelete : "cascade"
    })

        Users.hasMany(models.Posts,{
            onDelete : "cascade"
    })

    Users.hasOne(models.Profile,{
        onDelete : "cascade"
})
    }

    return Users
}