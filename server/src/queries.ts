import { Request, Response } from "express";
import * as fs from "fs";
import { User } from "./User";
import { pool as db } from "./database";
class Queries {
  getAllUsers(request: Request, response: Response) {
    db.connect((err, client, done) => {
      if (err) throw err;
      client.query(`select *, (select name as "customerName" from customers where user_id = users.id) from users`, (err, result) => {
        done();
        if (err) {
          console.log(err.stack);
          response.status(417).send(err.message);
        } else {
          response.setHeader("Content-Type", "application/json");
          response.status(200).json(result.rows);
        }
      });
    });
  }

  async saveUser(request: Request, response: Response) {
    const user = request.body as User;

    db.connect((err, client, done) => {
      client.query(
        `update users
                  set firstname = '${user.firstname}',
                   middlename = '${user.middlename}',
                   lastname = '${user.lastname}',
                   phone = '${user.phone}',
                   address = '${user.address}',
                   rolekey = '${user.rolekey}',
                   email = '${user.email}'
                  where id = '${user.id}';
                  `,
        (err, res) => {
          done();
          if (err) {
            console.log(err);
            response.status(417).send(err.message);
          } else {
            db.connect((err, client, done) => {
              client.query(
                `select * from users where id = '${user.id}'`,
                (er, result) => {
                  if (er) {
                    console.log(err);
                    response.status(417).send(err.message);
                  } else {
                    response.status(200).json(result.rows[0]);
                  }
                }
              );
            });
          }
        }
      );
    });
  }

  deleteUser(request: Request, response: Response) {
    db.connect((err, client, done) => {
      client.query(
        `delete from customers where user_id = ${request.params.userId}`,
        (err, result) => {
          done();
          if (err) {
            console.log(err.message);
            response.status(417).send(err.message);
            return;
          }
          db.connect((err, client, done) => {
            client.query(
              `delete from users where id = '${request.params.userId}'`,
              (err, result) => {
                done();
                if (err) {
                  console.log(err);
                  response.status(417).send(err.message);
                } else {
                  response.status(200).send();
                }
              }
            );
          });
        }
      );
    });
  }
  createUser(request: Request, response: Response) {
    const user = request.body as User;
    db.connect((err, client, done) => {
      client.query(
        `insert into users values ('${user.firstname}','${user.middlename}','${user.lastname}','${user.email}','${user.phone}','${user.address}','${user.rolekey}');`,
        (err, result) => {
          done();

          if (err) {
            console.log(err);
            response.status(417).send(err);
          } else {
            response.status(204).send();
          }
        }
      );
    });
  }

  getCustomerName(request: Request, response: Response) {
    let selector = "*";
    if (request.query.fields) {
      if (Array.isArray(request.query.fields)) {
        selector = request.query.fields.join(",");
      }
    }
    db.connect((err, client, done) => {
      client.query(`select ${selector} from customers`, (err, result) => {
        done();
        if (err) {
          console.log(err.message);
          response.status(404).send(err.message);
        } else {
          response.status(200).json(result.rows);
        }
      });
    });
  }
}

export const queries = new Queries();
