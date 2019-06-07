import firestore from "../../utils/firebase";
import { decrypt } from "../../utils/secure";
import jwt from "jsonwebtoken";

export class MSession {
  public authen = async (username: string, password: string) => {
    try {
      const snapShot = await firestore
        .collection("User")
        .where("username", "==", username)
        .get();
      if (snapShot.docs.length < 1) {
        throw new Error("not found this user");
      }
      const user = snapShot.docs[0].data();

      if (!user) {
        throw new Error("not found this user");
      }

      if (decrypt(password, user["password"])) {
        return jwt.sign(
          {
            username: user.username
          },
          process.env.SECRET_KEY || "test"
        );
      } else {
        throw new Error("password does not matched");
      }
    } catch (error) {
      throw error;
    }
  };

  public getUser = async () => {
    try {
      const snapShot = await firestore.collection("User").get();
      const users = [];
      snapShot.forEach(doc => {
        users.push(doc.data());
      });
      return users;
    } catch (error) {
      throw error;
    }
  };
}
