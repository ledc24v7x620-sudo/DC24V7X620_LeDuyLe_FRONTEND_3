const { ObjectId } = require("mongodb");

class ContactService {
    constructor(client) {
        this.Contact = client.db().collection("contacts");
    }
    extractContactData(payload) {
        const contact = {};        
        // Set các trường bắt buộc
        contact.name = payload.name;
        contact.email = payload.email;
        contact.address = payload.address;
        contact.phone = payload.phone;
        contact.favorite = payload.favorite !== undefined ? payload.favorite : false;
        contact.hobby = payload.hobby !== undefined && payload.hobby !== null 
            ? String(payload.hobby) 
            : "";
        contact.maritalStatus = payload.maritalStatus !== undefined && payload.maritalStatus !== null 
            ? String(payload.maritalStatus) 
            : "";
        
        return contact;
    } 

  
    async create(payload) {
        const contact = this.extractContactData(payload);
        contact.favorite = contact.favorite === true;
        if (!("hobby" in contact)) contact.hobby = "";
        if (!("maritalStatus" in contact)) contact.maritalStatus = "";
        contact.hobby = contact.hobby || "";
        contact.maritalStatus = contact.maritalStatus || "";
        const result = await this.Contact.insertOne(contact);
        const inserted = await this.Contact.findOne({ _id: result.insertedId });
        return inserted;
    }

    async find(filter) {
        const cursor = await this.Contact.find(filter);
        return await cursor.toArray();
    } 

    async findByName(name) {
        return await this.find({
        name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Contact.findOne({
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractContactData(payload);
        update.favorite = update.favorite === true;
        if (!("hobby" in update)) update.hobby = "";
        if (!("maritalStatus" in update)) update.maritalStatus = "";
        update.hobby = update.hobby || "";
        update.maritalStatus = update.maritalStatus || "";
        const result = await this.Contact.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.Contact.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async findFavorite() {
        return await this.find({ favorite: true });
    }

    async deleteAll() {
        const result = await this.Contact.deleteMany({});
        return result.deletedCount;
    }

} 

module.exports = ContactService;