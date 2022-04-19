import SQLite from 'react-native-sqlite-storage';
import { Alert, ToastAndroid, ActivityIndicator } from 'react-native';
import { Router, Stack, Scene } from 'react-native-router-flux';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'Reactoffline.db';
const database_version = '1.0';
const database_displayname = 'SQLite React Offline Database';
const database_size = 200000;

export default class Database {
  /////////////////////////////////////////////////////

  /*
        Database Section
    */

  ////////////////////////////////////////////////////

  //This Method is used to Initiate St Table, which is used to store data coming from Application.
  initDB() {
    let db;
    return new Promise(resolve => {
      console.log('Plugin integrity check for St TAble...');
      SQLite.echoTest()
        .then(() => {
          console.log('Integrity check passed for St table...');
          console.log('Opening database ...');
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              db = DB;
              console.log('Database for St Open');
              db.executeSql('SELECT 1 FROM St LIMIT 1')
                .then(() => {
                  console.log(
                    'Database for St ready ... executing query ...',
                  );
                })
                .catch(error => {
                  console.log('Received error: ', error);
                  console.log(
                    'Database for St not yet ready ... populating data',
                  );
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS St( id INTEGER PRIMARY KEY AUTOINCREMENT, atc TEXT, pzn INTEGER, name TEXT,  manufact_code TEXT, darrform_code TEXT,pack_size TEXT,dddpk INTEGER,appliform_code TEXT, flagInsertion INTEGER, userID INTEGER, CONSTRAINT fk_Users FOREIGN KEY (userID)  REFERENCES Users(userID))',
                    );
                  })
                    .then(() => {
                      console.log('St Table created successfully');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log('echoTest for St failed - plugin not functional');
        });
    });
  }

  initDB_survey() {
    let db;
    return new Promise(resolve => {
      console.log('Plugin integrity check for Survey TAble...');
      SQLite.echoTest()
        .then(() => {
          console.log('Integrity check passed for Survey table...');
          console.log('Opening database ...');
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              db = DB;
              console.log('Database for Survey Open');
              db.executeSql('SELECT 1 FROM Survey LIMIT 1')
                .then(() => {
                  console.log(
                    'Database for Survey ready ... executing query ...',
                  );
                })
                .catch(error => {
                  console.log('Received error: ', error);
                  console.log(
                    'Database for Survey not yet ready ... populating data',
                  );
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS survey( id INTEGER PRIMARY KEY AUTOINCREMENT, favoriteNumber TEXT, jugglingBalls TEXT, favoritePet TEXT,  favoriteFoods TEXT, userID INTEGER, CONSTRAINT fk_Users FOREIGN KEY (userID)  REFERENCES Users(userID))',
                    );
                  })
                    .then(() => {
                      console.log('Survey Table created successfully');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log('echoTest for Survey failed - plugin not functional');
        });
    });
  }

  initDB_History() {
    let db;
    return new Promise(resolve => {
      console.log('Plugin integrity check for History TAble...');
      SQLite.echoTest()
        .then(() => {
          console.log('Integrity check passed for History table...');
          console.log('Opening database ...');
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              db = DB;
              console.log('Database for History Open');
              db.executeSql('SELECT 1 FROM history LIMIT 1')
                .then(() => {
                  console.log(
                    'Database for History ready ... executing query ...',
                  );
                })
                .catch(error => {
                  console.log('Received error: ', error);
                  console.log(
                    'Database for History not yet ready ... populating data',
                  );
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS history( id INTEGER PRIMARY KEY AUTOINCREMENT, atc TEXT, pzn INTEGER, userID INTEGER, current_time TEXT)',
                    );
                  })
                    .then(() => {
                      console.log('History Table created successfully');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log('echoTest for History failed - plugin not functional');
        });
    });
  }

  initDB_darrform() {
    let db;
    return new Promise(resolve => {
      console.log('Plugin integrity check for darrform TAble...');
      SQLite.echoTest()
        .then(() => {
          console.log('Integrity check passed for darrform table...');
          console.log('Opening database ...');
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              db = DB;
              console.log('Database for darrform Open');
              db.executeSql('SELECT 1 FROM darrform LIMIT 1')
                .then(() => {
                  console.log(
                    'Database for darrform ready ... executing query ...',
                  );
                })
                .catch(error => {
                  console.log('Received error: ', error);
                  console.log(
                    'Database for darrform not yet ready ... populating data',
                  );
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS darrform(darrform_code TEXT PRIMARY KEY,name CHAR(70) NOT NULL, is_prioritized INTEGER NOT NULL)',
                    );
                  })
                    .then(() => {
                      console.log('darrform Table created successfully');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log('echoTest for darrform failed - plugin not functional');
        });
    });
  }

  initDB_appliform() {
    let db;
    return new Promise(resolve => {
      console.log('Plugin integrity check for appliform TAble...');
      SQLite.echoTest()
        .then(() => {
          console.log('Integrity check passed for appliform table...');
          console.log('Opening database ...');
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              db = DB;
              console.log('Database for appliform Open');
              db.executeSql('SELECT 1 FROM appliform LIMIT 1')
                .then(() => {
                  console.log(
                    'Database for appliform ready ... executing query ...',
                  );
                })
                .catch(error => {
                  console.log('Received error: ', error);
                  console.log(
                    'Database for appliform not yet ready ... populating data',
                  );
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS appliform(appliform_code TEXT PRIMARY KEY,name CHAR(70) NOT NULL, is_prioritized INTEGER NOT NULL)',
                    );
                  })
                    .then(() => {
                      console.log('appliform Table created successfully');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log('echoTest for appliform failed - plugin not functional');
        });
    });
  }

  // This Method is used to create Database Table which load or list ATC, PZN, and other information into the application either via Barcode Scan or Manual Search

  initDB_Database() {
    let db;
    return new Promise(resolve => {
      console.log('Plugin integrity check for Database TAble...');
      SQLite.echoTest()
        .then(() => {
          console.log('Integrity check passed for Database table...');
          console.log('Opening database ...');
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              db = DB;
              console.log('Database for Database Open');
              db.executeSql('SELECT 1 FROM Database LIMIT 1')
                .then(() => {
                  console.log(
                    'Database for Database ready ... executing query ...',
                  );
                })
                .catch(error => {
                  console.log('Received error: ', error);
                  console.log(
                    'Database for Database not yet ready ... populating data',
                  );
                  db.transaction(tx => {
                    Query =
                      'CREATE TABLE IF NOT EXISTS Database( id INTEGER PRIMARY KEY AUTOINCREMENT, atc TEXT, pzn INTEGER, name TEXT,  manufact_code TEXT, darrform_code TEXT,pack_size TEXT,dddpk INTEGER,appliform_code TEXT,  FOREIGN KEY(darrform_code) REFERENCES Database_darrform(darrform_code), FOREIGN KEY(appliform_code) REFERENCES Database_appliform(appliform_code))';

                    tx.executeSql(Query);
                  })
                    .then(() => {
                      console.log('Database Table created successfully');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log('echoTest for Database failed - plugin not functional');
        });
    });
  }

  /////////////////////////////////////////////////////

  /*
        User Authentication and Personal Data
    */

  ////////////////////////////////////////////////////

  initDB_users() {
    let db;
    return new Promise(resolve => {
      console.log('Plugin integrity check for Users TAble...');
      SQLite.echoTest()
        .then(() => {
          console.log('Integrity check passed for USERS table...');
          console.log('Opening database ...');
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              db = DB;
              console.log('Database for UsersOPEN');
              db.executeSql('SELECT 1 FROM Users LIMIT 1')
                .then(() => {
                  console.log(
                    'Database for Usersis ready ... executing query ...',
                  );
                })
                .catch(error => {
                  console.log('Received error: ', error);
                  console.log(
                    'Database for Users not yet ready ... populating data',
                  );
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS Users (userID INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, email TEXT, password TEXT NOT NULL, first_name TEXT, last_name TEXT, dob TEXT, sex TEXT, insurance_number TEXT,phonenumber TEXT,address TEXT,zip TEXT,city TEXT,participant_id TEXT)',
                    );
                  })
                    .then(() => {
                      console.log('Users Table created successfully');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log('echoTest for Users failed - plugin not functional');
        });
    });
  }

  initDB_anthro_data() {
    let db;
    return new Promise(resolve => {
      console.log('Plugin integrity check for anthro_data TAble...');
      SQLite.echoTest()
        .then(() => {
          console.log('Integrity check passed for anthro_data table...');
          console.log('Opening database ...');
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              db = DB;
              console.log('Database for anthro_data');
              db.executeSql('SELECT 1 FROM anthro_data LIMIT 1')
                .then(() => {
                  console.log(
                    'Database for anthro_data ready ... executing query ...',
                  );
                })
                .catch(error => {
                  console.log('Received error: ', error);
                  console.log(
                    'Database for anthro_data not yet ready ... populating data',
                  );
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS anthro_data ( id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, size REAL, weight REAL, date TEXT, FOREIGN KEY(user_id) REFERENCES users(id))',
                    );
                  })
                    .then(() => {
                      console.log('anthro_data Table created successfully');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(
            'echoTest for anthro_data failed - plugin not functional',
          );
        });
    });
  }



  /////////////////////////////////////////////////////

  /*
        Medication Plan Table Creation 
    */

  ////////////////////////////////////////////////////

  initDB_mp_items() {
    let db;
    return new Promise(resolve => {
      console.log('Plugin integrity check for mp_items TAble...');
      SQLite.echoTest()
        .then(() => {
          console.log('Integrity check passed for mp_items table...');
          console.log('Opening database ...');
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              db = DB;
              console.log('Database for mp_items');
              db.executeSql('SELECT 1 FROM mp_items LIMIT 1')
                .then(() => {
                  console.log(
                    'Database for mp_items ready ... executing query ...',
                  );
                })
                .catch(error => {
                  console.log('Received error: ', error);
                  console.log(
                    'Database for mp_items not yet ready ... populating data',
                  );
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS mp_items ( id INTEGER PRIMARY KEY AUTOINCREMENT,atc CHAR(7),pzn INTEGER,drug TEXT, name CHAR(200) NOT NULL,dosage REAL, dosage_unit  TEXT,darrform_code  TEXT NOT NULL, dosing TEXT NOT NULL,unit TEXT NOT NULL,interval_id INTEGER NOT NULL,comment TEXT NOT NULL,start_date CHAR(10) NOT NULL,reason TEXT NOT NULL, stop_date CHAR(10),stop_reason TEXT,prescr_type_id INTEGER,use_type_id INTEGER NOT NULL)',
                    );
                  })
                    .then(() => {
                      console.log('mp_items Table created successfully');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log('echoTest for mp_items failed - plugin not functional');
        });
    });
  }

  initDB_mp_versions() {
    let db;
    return new Promise(resolve => {
      console.log('Plugin integrity check for mp_versions TAble...');
      SQLite.echoTest()
        .then(() => {
          console.log('Integrity check passed for mp_versions table...');
          console.log('Opening database ...');
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              db = DB;
              console.log('Database for mp_versions');
              db.executeSql('SELECT 1 FROM mp_versions LIMIT 1')
                .then(() => {
                  console.log(
                    'Database for mp_versions ready ... executing query ...',
                  );
                })
                .catch(error => {
                  console.log('Received error: ', error);
                  console.log(
                    'Database for mp_versions not yet ready ... populating data',
                  );
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS mp_versions (id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER,mp_creator VARCHAR(30),mp_datetime TEXT,FOREIGN KEY(user_id) REFERENCES users(id))',
                    );
                  })
                    .then(() => {
                      console.log('mp_versions Table created successfully');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(
            'echoTest for mp_versions failed - plugin not functional',
          );
        });
    });
  }

  initDB_mp_versions_items() {
    let db;
    return new Promise(resolve => {
      console.log('Plugin integrity check for mp_versions_items TAble...');
      SQLite.echoTest()
        .then(() => {
          console.log('Integrity check passed for mp_versions_items table...');
          console.log('Opening database ...');
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              db = DB;
              console.log('Database for mp_versions_items');
              db.executeSql('SELECT 1 FROM mp_versions_items LIMIT 1')
                .then(() => {
                  console.log(
                    'Database for mp_versions_items ready ... executing query ...',
                  );
                })
                .catch(error => {
                  console.log('Received error: ', error);
                  console.log(
                    'Database for mp_versions_items not yet ready ... populating data',
                  );
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS mp_versions_items (id INTEGER PRIMARY KEY AUTOINCREMENT,mp_version_id INTEGER,mp_item_id INTEGER,FOREIGN KEY(mp_version_id) REFERENCES mp_versions(id),FOREIGN KEY(mp_item_id) REFERENCES mp_items(id))',
                    );
                  })
                    .then(() => {
                      console.log(
                        'mp_versions_items Table created successfully',
                      );
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(
            'echoTest for mp_versions_items failed - plugin not functional',
          );
        });
    });
  }

  // Diagnosis: basis for the "reason" why a drug is being prescribed.
  initDB_mp_diagnosis() {
    let db;
    return new Promise(resolve => {
      console.log('Plugin integrity check for mp_diagnosis TAble...');
      SQLite.echoTest()
        .then(() => {
          console.log('Integrity check passed for mp_diagnosis table...');
          console.log('Opening database ...');
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              db = DB;
              console.log('Database for mp_diagnosis');
              db.executeSql('SELECT 1 FROM mp_diagnosis LIMIT 1')
                .then(() => {
                  console.log(
                    'Database for mp_diagnosis ready ... executing query ...',
                  );
                })
                .catch(error => {
                  console.log('Received error: ', error);
                  console.log(
                    'Database for mp_diagnosis not yet ready ... populating data',
                  );
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS mp_diagnosis (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL)',
                    );
                  })
                    .then(() => {
                      console.log('mp_diagnosis Table created successfully');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(
            'echoTest for mp_diagnosis failed - plugin not functional',
          );
        });
    });
  }

  initDB_mp_atc_diagnosis() {
    let db;
    return new Promise(resolve => {
      console.log('Plugin integrity check for mp_atc_diagnosis TAble...');
      SQLite.echoTest()
        .then(() => {
          console.log('Integrity check passed for mp_atc_diagnosis table...');
          console.log('Opening database ...');
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              db = DB;
              console.log('Database for mp_atc_diagnosis');
              db.executeSql('SELECT 1 FROM mp_atc_diagnosis LIMIT 1')
                .then(() => {
                  console.log(
                    'Database for mp_atc_diagnosis ready ... executing query ...',
                  );
                })
                .catch(error => {
                  console.log('Received error: ', error);
                  console.log(
                    'Database for mp_atc_diagnosis not yet ready ... populating data',
                  );
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS mp_atc_diagnosis ( id INTEGER PRIMARY KEY AUTOINCREMENT,atc_prefix  TEXT NOT NULL,diagnosis_id  INTEGER NOT NULL,FOREIGN KEY(diagnosis_id) REFERENCES mp_diagnosis(id))',
                    );
                  })
                    .then(() => {
                      console.log(
                        'mp_atc_diagnosis Table created successfully',
                      );
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(
            'echoTest for mp_atc_diagnosis failed - plugin not functional',
          );
        });
    });
  }

  // Applikationsform - Darreichungsform link table: basis to show up only the relevant Darreichungsformen per Applikationsform.
  initDB_mp_appliform_darrform() {
    let db;
    return new Promise(resolve => {
      console.log('Plugin integrity check for mp_appliform_darrform  TAble...');
      SQLite.echoTest()
        .then(() => {
          console.log(
            'Integrity check passed for mp_appliform_darrform  table...',
          );
          console.log('Opening database ...');
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              db = DB;
              console.log('Database for mp_appliform_darrform ');
              db.executeSql('SELECT 1 FROM mp_appliform_darrform  LIMIT 1')
                .then(() => {
                  console.log(
                    'Database for mp_appliform_darrform  ready ... executing query ...',
                  );
                })
                .catch(error => {
                  console.log('Received error: ', error);
                  console.log(
                    'Database for mp_appliform_darrform  not yet ready ... populating data',
                  );
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS mp_appliform_darrform  (id INTEGER PRIMARY KEY AUTOINCREMENT, appliform_code TEXT NOT NULL, darrform_code  TEXT NOT NULL)',
                    );
                  })
                    .then(() => {
                      console.log(
                        'mp_appliform_darrform  Table created successfully',
                      );
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(
            'echoTest for mp_appliform_darrform  failed - plugin not functional',
          );
        });
    });
  }

  // Initiating Table for NextScreenPZN (mp_items_1)
  initDB_mp_items_1() {
    let db;
    return new Promise(resolve => {
      console.log('Plugin integrity check for mp_items_1  TAble...');
      SQLite.echoTest()
        .then(() => {
          console.log('Integrity check passed for mp_items_1  table...');
          console.log('Opening database ...');
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              db = DB;
              console.log('Database for mp_items ');
              db.executeSql('SELECT 1 FROM mp_items_1  LIMIT 1')
                .then(() => {
                  console.log(
                    'Database for mp_items_1  ready ... executing query ...',
                  );
                })
                .catch(error => {
                  console.log('Received error: ', error);
                  console.log(
                    'Database for mp_items_1  not yet ready ... populating data',
                  );
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS mp_items_1 (id INTEGER PRIMARY KEY AUTOINCREMENT,verordnet TEXT,bedarf TEXT,Personalich_Angaben_Morgen TEXT, Personalich_Angaben_Mittag TEXT ,Personalich_Angaben_Abend TEXT, Personalich_Angaben_Nacht TEXT, Doseseinheit TEXT, duration_of_dosage TEXT,interval_der_tagesdosen TEXT,Haufigkeit TEXT,bemerkungen TEXT, flagInsertion INTEGER, userID INTEGER, pzn INTEGER, CONSTRAINT fk_St FOREIGN KEY (pzn)  REFERENCES St(pzn))',
                    );
                  })
                    .then(() => {
                      console.log('mp_items_1  Table created successfully');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(
            'echoTest for mp_items_1  failed - plugin not functional',
          );
        });
    });
  }

  /////////////////////////////////////////////////////

  /*
        Method Operations
    */

  ////////////////////////////////////////////////////

  onLoginPress(username, password) {
    console.log(username, password);
    return new Promise(resolve => {
      this.initDB_users()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT * FROM Users WHERE username = ? AND password = ?',
              [username, password],
            ).then(([tx, results]) => {
              console.log(results);
              const len = results.rows.length;
              if (!len) {
                alert('Username and Password Not Correct');
              } else {
                const row = results.rows.item(0);

                if (username === row.username && password === row.password) {
                  //Alert.alert('Successful');
                  // this.props.navigation.navigate('HomeScreen', {username});
                  // this.props.navigation.navigate('UserAddScreen');



                  //  Actions.MedicationRecordList({ userID: row.userID });

                  Actions.MedicationRecordList({ userID: row.username });

                  // Actions.productEditScreen2({pzn: item.pzn})}
                  ToastAndroid.show('Login SUCCESSFUL !', ToastAndroid.LONG);
                  return;
                } else {
                  Alert.alert('Username or Password is incorrect');
                }
                alert('Authentication failed!');
              }
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  onLoginPress_Phone(username) {
    console.log(username);
    return new Promise(resolve => {
      this.initDB_users()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT * FROM Users WHERE username = ?',
              [username],
            ).then(([tx, results]) => {
              console.log(results);
              const len = results.rows.length;
              if (!len) {
                alert('Phone number is not correct');
              } else {
                const row = results.rows.item(0);

                if (username === row.username) {
                  //Alert.alert('Successful');
                  // this.props.navigation.navigate('HomeScreen', {username});
                  // this.props.navigation.navigate('UserAddScreen');

                  Actions.MedicationRecordList({ userID: row.userID });
                  // Actions.productEditScreen2({pzn: item.pzn})}
                  ToastAndroid.show('Login SUCCESSFUL !', ToastAndroid.LONG);
                  return;
                } else {
                  Alert.alert('This Phone Number is not Registered with us');
                }
                alert('Authentication failed!');
              }
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  onLoginPress_pzn(input_user_id) {
    console.log(input_user_id);
    return new Promise(resolve => {
      this.initDB_Database()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT * FROM Database WHERE pzn = ?'[input_user_id],
            ).then(([tx, results]) => {
              console.log(results);
              const len = results.rows.length;
              if (!len) {
                alert('PZN is not Correct');
              } else {
                const row = results.rows.item(0);

                if (input_user_id === row.pzn) {
                  //Alert.alert('Successful');
                  // this.props.navigation.navigate('HomeScreen', {username});
                  // this.props.navigation.navigate('UserAddScreen');

                  Alert.alert("PZN is correct");
                  // Actions.FirstAddScreen({userID: row.userID});
                  // Actions.productEditScreen2({pzn: item.pzn})}
                  ToastAndroid.show('Login SUCCESSFUL !', ToastAndroid.LONG);
                  return;
                } else {
                  Alert.alert('PZN is not correct');
                }
                alert('FAiled');
              }
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  // This Method is used to List St Table Elements into the Application
  listProduct(userID) {
    console.log(userID);
    return new Promise(resolve => {
      const products = [];
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT p.atc, p.pzn, p.name, p.manufact_code, p.darrform_code, p.pack_size, p.dddpk, p.appliform_code FROM St p WHERE userID = ?',
              [userID],
            ).then(([tx, results]) => {
              console.log('Query completed');
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                console.log(`Prod ID: ${row.atc}, Prod Name: ${row.atc}`);
                const {
                  atc,
                  pzn,
                  manufact_code,
                  darrform_code,
                  pack_size,
                  appliform_code,
                } = row;
                products.push({
                  atc,
                  pzn,
                  manufact_code,
                  darrform_code,
                  pack_size,
                  appliform_code,
                });
              }
              console.log(products);
              resolve(products);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  // This Method is used to List St Table Elements into the Application
  listProduct_history(userID) {
    console.log(userID);
    return new Promise(resolve => {
      const products = [];
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT p.atc, p.pzn, p.current_time FROM history p WHERE userID = ?',
              [userID],
            ).then(([tx, results]) => {
              console.log('Query completed');
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                console.log(`Prod ID: ${row.atc}, Prod Name: ${row.atc}`);
                const {
                  atc,
                  pzn,
                  current_time,

                } = row;
                products.push({
                  atc,
                  pzn,
                  current_time,

                });
              }
              console.log(products);
              resolve(products);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }



  // This Method is used to List St Table Elements into the Application
  listProduct_drugs(name, userID) {
    console.log(name);
    return new Promise(resolve => {
      const products = [];
      this.initDB_Database()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              //  'SELECT  p.name FROM Database p WHERE name like ?',[name],
              //  "SELECT p.name FROM Database p WHERE name like ?",[name],

              // "SELECT  p.name FROM Database p where name  LIKE '%"+name+"%'",[],
              "SELECT  p.name FROM Database p where name  LIKE '" + name + "%'", [],

              // "SELECT  * FROM Database where name  LIKE '"+"?"+"'",[name],

            ).then(([tx, results]) => {

              console.log('Query completed');

              var len = results.rows.length;


              if (!len) {
                Alert.alert(
                  'No Record Found',
                  '' + '' + '',
                  [

                    {
                      text: 'OK',
                      // onPress: () => Actions.ManualSearchDrugName({userID}),
                    },
                  ],
                  { cancelable: false },
                )

              }
              else {
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  console.log(`Prod Name: ${row.name}`);
                  const {
                    name,
                  } = row;
                  products.push({
                    name
                  });
                }

              }


              console.log(products);
              resolve(products);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  listProduct_drugs_backup(name) {
    console.log(name);
    return new Promise(resolve => {
      const products = [];
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT p.atc, p.pzn, p.name, p.manufact_code, p.darrform_code, p.pack_size, p.dddpk, p.appliform_code FROM Database p WHERE name = ?',
              [name],
            ).then(([tx, results]) => {
              console.log('Query completed');
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                console.log(`Prod ID: ${row.atc}, Prod Name: ${row.atc}`);
                const {
                  atc,
                  pzn,
                  name,
                  manufact_code,

                  darrform_code,
                  pack_size,
                  appliform_code,
                } = row;
                products.push({
                  atc,
                  pzn,
                  manufact_code,
                  darrform_code,
                  pack_size,
                  appliform_code,
                });
              }
              console.log(products);
              resolve(products);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }


  // This method is used to Select * From Database Table Where PZN = ?
  productById_Database(pzn, userID) {
    console.log(pzn);
    return new Promise(resolve => {
      this.initDB_Database()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM Database WHERE pzn = ?', [pzn]).then(
              ([tx, results]) => {
                console.log(results);

                var len = results.rows.length;


                if (!len) { // this line is checking whether the provided pzn as an inpput by the user is available in the database or not
                  Alert.alert(
                    'No PZN Found',
                    '' + '' + '',
                    [

                      {
                        text: 'OK',
                        // Fetching people to Manual Search PZN Screen : HomeScreen
                        onPress: () => Actions.HomeScreen({ userID }),
                      },
                    ],
                    { cancelable: false },
                  )

                }

                else if (results.rows.length > 0) {
                  let row = results.rows.item(0);
                  resolve(row);
                }
              },
            );
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  // This method is used to Select * From St Table Where PZN = ?
  productById(pzn) {
    console.log(pzn);
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM St WHERE pzn = ?', [pzn]).then(
              ([tx, results]) => {

                console.log(results);
                if (results.rows.length > 0) {
                  let row = results.rows.item(0);
                  resolve(row);
                }
              },
            );
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  // This method is used to Select * From St Table Where Drug Name = ?
  productByDrugName(name) {
    console.log(name);
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM Database WHERE name = ?', [name]).then(
              ([tx, results]) => {
                console.log(results);
                if (results.rows.length > 0) {
                  let row = results.rows.item(0);
                  resolve(row);
                }
              },
            );
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  productById_flagInsertion(userID) {
    console.log(userID);
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM St WHERE userID = ?', [
              userID,
            ]).then(([tx, results]) => {
              console.log(results);
              if (results.rows.length > 0) {
                let row = results.rows.item(0);
                resolve(row);
              }
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  productById_mp_item(pzn) {
    console.log(pzn);
    return new Promise(resolve => {
      this.initDB_mp_items_1()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM mp_items_1 WHERE pzn = ?', [pzn]
            ).then(([tx, results]) => {
              console.log(results);
              if (results.rows.length > 0) {
                let row = results.rows.item(0);
                resolve(row);
              }
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
  // This method is used to Select * from Database Table where PZN = ?
  DatabaseById(pzn) {
    console.log(pzn);
    return new Promise(resolve => {
      this.initDB_Database()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM Database WHERE pzn = ?', [pzn]).then(
              ([tx, results]) => {
                console.log(results);
                if (results.rows.length > 0) {
                  let row = results.rows.item(0);
                  resolve(row);
                }
              },
            );
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  // This method is used to Select * from Users Table where username = ?
  userByID(username) {
    console.log(username);

    return new Promise(resolve => {
      this.initDB_users()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM Users WHERE username = ?', [
              username,
            ]).then(([tx, results]) => {
              console.log(results);
              if (results.rows.length > 0) {
                let row = results.rows.item(0);
                resolve(row);
              }
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }


  // This method is used to check for the duplication of username inside SQLite database
  addUser_Check(username, prod) {
    return new Promise(resolve => {
      this.initDB_users()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM Users WHERE username = ?', [
              username,
            ]).then(([tx, results]) => {
              console.log(results);
              const len = results.rows.length;
              if (!len) {
                this.addUser(prod);


              } else {
                const row = results.rows.item(0);
                console.log(username);
                if (username === row.username && prod.email != 3) {
                  Alert.alert('username is already available');
                  //Actions.UserAddScreen();
                  Actions.productWelcomeScreen();
                  // return;
                }
                else {
                  this.addUser(prod);
                }
              }
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  // This method is used to Insert values into Users Table taken from the App Dynamically
  addUser(prod) {
    return new Promise(resolve => {
      this.initDB_users()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'INSERT INTO Users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
              [
                prod.userID,
                prod.username,
                prod.email,
                prod.password,
                prod.first_name,
                prod.last_name,
                prod.dob,
                prod.sex,
                prod.insurance_number,
                prod.phonenumber,
                prod.address,
                prod.zip,
                prod.city,
                prod.participant_id,
              ],
            ).then(([tx, results]) => {
              resolve(results);


              if (prod.password === 2) {
                Actions.LoginScreenPhone();
              }
              else if (prod.email === 3) {
                const username = prod.username;
                const password = prod.password;
                this.onLoginPress(username, password);
              }
              else if (prod.email === 1) {
                Actions.login();
                ToastAndroid.show(
                  'Registration Successful !',
                  ToastAndroid.LONG,
                );
              }



            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  // This method is used to insert values into St table taken from the App Dynamically
  addProduct(prod) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'INSERT INTO St VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
              [
                prod.id,
                prod.atc,
                prod.pzn,
                prod.name,
                prod.manufact_code,
                prod.darrform_code,
                prod.pack_size,
                prod.dddpk,
                prod.appliform_code,
                prod.flagInsertion,
                prod.userID,
              ],
            ).then(([tx, results]) => {
              resolve(results);
              //  Alert.alert("Finished insertion in First Screen");
              // this.addProduct_history(prod);

              console.log('finished insertion into St');
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  // This method is used to insert values into History table taken from the App Dynamically
  addProduct_history(prod) {
    return new Promise(resolve => {
      this.initDB_History()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'INSERT INTO history VALUES (?, ?, ?, ?, ?)',
              [
                prod.id,
                prod.atc,
                prod.pzn,
                prod.userID,
                prod.current_time,

              ],
            ).then(([tx, results]) => {
              resolve(results);
              //  Alert.alert("finished insertion in HISTORY"); 
              console.log('finished insertion into history');
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

   // This method is used to insert into Survey
   addProduct_survey(prod) {
    return new Promise(resolve => {
      this.initDB_survey()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'INSERT INTO survey VALUES (?, ?, ?, ?, ?, ?)',
              [
                prod.id,
                prod.favoriteNumber,
                prod.jugglingBalls,
                prod.favoritePet,
                prod.favoriteFoods,
                prod.userID,

              ],
            ).then(([tx, results]) => {
              resolve(results);
                Alert.alert("finished insertion in Survey"); 
              console.log('finished insertion into Survey');
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  // This method is used to Insert mp_items_1 table data
  add_mp_items_1(prod) {
    return new Promise(resolve => {
      this.initDB_mp_items_1()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'INSERT INTO mp_items_1 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)',
              [
                prod.id,
                prod.verordnet,
                prod.bedarf,
                prod.Personalich_Angaben_Morgen,
                prod.Personalich_Angaben_Mittag,
                prod.Personalich_Angaben_Abend,
                prod.Personalich_Angaben_Nacht,
                prod.Doseseinheit,
                prod.duration_of_dosage,
                prod.interval_der_tagesdosen,
                prod.Haufigkeit,
                prod.bemerkungen,
                prod.flagInsertion,
                prod.userID,
                prod.pzn,
              ],
            ).then(([tx, results]) => {
              resolve(results);
              console.log('Finished insertion into MP_ITEMS_1 Table');
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
  // This method is used to UPDATE St table where PZN = ?
  addProduct_St(userID, prod) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'UPDATE St SET atc = ?, pzn = ?, name = ?, manufact_code = ? , darrform_code = ? , pack_size = ? , dddpk = ? , appliform_code = ? , flagInsertion = ? WHERE userID = ?',
              [
                prod.atc,
                prod.pzn,
                prod.name,
                prod.manufact_code,
                prod.darrform_code,
                prod.pack_size,
                prod.dddpk,
                prod.appliform_code,
                prod.flagInsertion,
                userID,
              ],
            ).then(([tx, results]) => {
              resolve(results);
              // this.addProduct_history(prod);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  addProduct_mp_items_1(userID, prod) {
    return new Promise(resolve => {
      this.initDB_mp_items_1()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'UPDATE mp_items_1 SET verordnet = ?, bedarf = ?, Personalich_Angaben_Morgen = ?, Personalich_Angaben_Mittag = ? , Personalich_Angaben_Abend = ? , Personalich_Angaben_Nacht = ? , Doseseinheit = ? , duration_of_dosage = ? , interval_der_tagesdosen = ? , Haufigkeit = ? , bemerkungen = ? , flagInsertion = ? WHERE userID = ?',
              [
                prod.verordnet,
                prod.bedarf,
                prod.Personalich_Angaben_Morgen,
                prod.Personalich_Angaben_Mittag,
                prod.Personalich_Angaben_Abend,
                prod.Personalich_Angaben_Nacht,
                prod.Doseseinheit,
                prod.duration_of_dosage,
                prod.interval_der_tagesdosen,
                prod.Haufigkeit,
                prod.bemerkungen,
                prod.flagInsertion,
                userID,
              ],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  updateSurvey(userID, prod) {
    return new Promise(resolve => {
      this.initDB_survey()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'UPDATE survey SET favoriteNumber = ?, jugglingBalls = ?, favoritePet = ?, favoriteFoods = ? WHERE userID = ?',
              [
                prod.favoriteNumber,
                prod.jugglingBalls,
                prod.favoritePet,
                prod.favoriteFoods,
                userID,
              ],
            ).then(([tx, results]) => {
              resolve(results);
              Alert.alert("Update Finished in Survey"); 
              Actions.MainScreen({userID:userID});
            });
          })
            .then(result => {
              this.closeDatabase(db);

            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  // This method is used to Update St table Where id = ?
  updateProduct(id, prod) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'UPDATE St SET atc = ?, pzn = ?, name = ?, manufact_code = ? , darrform_code = ? , pack_size = ? , dddpk = ? , appliform_code = ? WHERE id = ?',
              [
                prod.atc,
                prod.pzn,
                prod.manufact_code,
                prod.darrform_code,
                prod.pack_size,
                prod.dddpk,
                prod.appliform_code,
                id,
              ],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  // This method is used to Delete From St table where id = ?
  deleteProduct(pzn) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('DELETE FROM St WHERE pzn = ?', [pzn]).then(
              ([tx, results]) => {
                console.log(results);
                resolve(results);
              },
            );
          })
            .then(result => {
              this.closeDatabase(db);
              Alert.alert("Record Deleted");
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  /////////////////////////////////////////////////////

  /*
        Close Database 
    */

  ////////////////////////////////////////////////////

  closeDatabase(db) {
    if (db) {
      console.log('Closing DB');
      db.close()
        .then(status => {
          console.log('Database CLOSED');
        })
        .catch(error => {
          this.errorCB(error);
        });
    } else {
      console.log('Database was not OPENED');
    }
  }




  // This method is used to Insert data into a Database table for ATC, PZN etc, Turn off this method, when data is populated for the first time
  addDatabaseData() {
    return new Promise(resolve => {
      this.initDB_Database()
        .then(db => {
          db.transaction(tx => {
           
            tx.executeSql(`





            INSERT INTO Database (atc, pzn, name, manufact_code, darrform_code, pack_size, dddpk, appliform_code) 
            VALUES  ('L01XX17', 13836119, 'Topotecan Heumann 1 mg P.f.e.Konz.z.H.e.Inf.L.', 'HEUMNN01', 'PIK', '10', 1538, 'P'),
            
            
            
            ('', 46, 'A 66', 'TOGAL 01', 'DRA', '300', 0, ''),
            ('', 52, 'A 66', 'TOGAL 01', 'DRA', '1800', 0, ''),
            



          `).then(([tx, results]) => {
              resolve(results);
              console.log('Database Data inserted Successfully');
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }









}



