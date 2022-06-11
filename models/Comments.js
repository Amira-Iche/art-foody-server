module.exports = (sequelize,DataTypes) => {

    const Comments = sequelize.define("Comments", {
        commentContent : {
            type: DataTypes.STRING,
            allowNul: false,
        },
        username : {
            type: DataTypes.STRING,
            allowNul: false,
        }
    })

    return Comments
}