module.exports = function(sequelize, Datatypes) {
  var Auths = sequelize.define("Auths", {
  
    username: {
      type: Datatypes.STRING
    },
    
    password: {
      type: Datatypes.STRING
    },
    
    createdAt: {
      type: Datatypes.DATE,
      defaultValue: Datatypes.NOW
    },
    updatedAt: {
      type: Datatypes.DATE,
      defaultValue: Datatypes.NOW
    }
    // }
    // hooks: {
    //   beforeCreate: auths => {
    //     auths.full_name = `${auths.first} ${auths.last}`;
    //   }
    // }
  });
 

  return Auths;
};
