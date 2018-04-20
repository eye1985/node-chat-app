const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

    let users;

    beforeEach(()=>{
        users = new Users();
        users.users = [
            {
                id:1,
                name:'Mike',
                room:'room123'
            },
            {
                id:2,
                name:'Jen',
                room:'room456'
            },
            {
                id:3,
                name:'Peter',
                room:'room123'
            }
        ];
    });

    it('should add new user', () => {
        const users = new Users();
        const user = {
            id:'123',
            name:'erik',
            room :'room123'
        };

        const resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return names for room123', () => {
        const userList = users.getUserList('room123');
        expect(userList).toEqual(['Mike', 'Peter']);
    });

    it('should return names for room456', () => {
        const userList = users.getUserList('room456');
        expect(userList).toEqual(['Jen']);
    });

    it('should remove a user', () => {
        users.removeUser(1);
        expect(users.users).toEqual([
            {
                id:2,
                name:'Jen',
                room:'room456'
            },
            {
                id:3,
                name:'Peter',
                room:'room123'
            }
        ]);
    });

    it('should not remove user', () => {
        users.removeUser(4);
        expect(users.users).toEqual([
            {
                id:1,
                name:'Mike',
                room:'room123'
            },
            {
                id:2,
                name:'Jen',
                room:'room456'
            },
            {
                id:3,
                name:'Peter',
                room:'room123'
            }
        ]);
    });

    it('should find user', () => {
        const myUser = users.getUser(1);
        expect(myUser).toEqual({
            id:1,
            name:'Mike',
            room:'room123'
        })
    });

    it('should not find user', () => {
        const myUser = users.getUser(4);
        expect(myUser).toBeFalsy();
    });
});