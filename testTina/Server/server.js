const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const { toast } = require('react-toastify');


const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());
const dbFilePath = 'db.json';


app.get('/user', (req, res) => {
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Đã xảy ra lỗi khi đọc file db.json:', err);
            return res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin.' });
        }
        const currentData = JSON.parse(data);
        res.json({ success: true, user: currentData.user });
    });
});



app.post('/login', (req, res) => {
    const { username, password } = req.body;


    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Đã xảy ra lỗi khi đọc file db.json:', err);
            return res.status(500).json({ error: 'Đã xảy ra lỗi khi đọc thông tin đăng nhập.' });
        }
        try {
            const users = JSON.parse(data).user;
            const user = users.find(user => user.username === username && user.password === password);
            if (user) {
                // loggedInUser = users.username;
                // console.log("loggedInUser: ", loggedInUser);
                res.json({ success: true, message: 'Đăng nhập thành công', user });

            } else {
                res.status(401).json({ success: false, message: 'Thông tin đăng nhập không chính xác' });
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi khi phân tích dữ liệu từ db.json:', error);
            return res.status(500).json({ error: 'Đã xảy ra lỗi khi xác thực người dùng.' });
        }
    });
});

app.post('/register', (req, res) => {
    const { username, password, name, email, again } = req.body;

    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Đã xảy ra lỗi khi đọc file db.json:', err);
            return res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm người dùng.' });
        }

        const currentData = JSON.parse(data);

        const check = currentData.user.find(user => user.username === username);
        if (!check) {
            if (again === password) {
                currentData.user.push({ username, password, name, email });
                fs.writeFile(dbFilePath, JSON.stringify(currentData), (err) => {
                    if (err) {
                        console.error('Đã xảy ra lỗi khi ghi file db.json:', err);
                        return res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm người dùng.' });
                    }
                    res.json({ success: true });
                });
            } else return res.status(500).json({ error: 'Mật khẩu không khớp!' });
        } else return res.status(500).json({ error: 'Tài khoản đã tồn tại!' });
    });
});

app.post('/addProfile', (req, res) => {
    const { username, numberPhone } = req.body;

    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Đã xảy ra lỗi khi đọc file db.json:', err);
            return res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm người dùng.' });
        }
        const currentData = JSON.parse(data);
        const userIndex = currentData.user.findIndex(user => user.username === username);
        currentData.user[userIndex].number = numberPhone;
        fs.writeFile(dbFilePath, JSON.stringify(currentData), (err) => {
            if (err) {
                console.error('Đã xảy ra lỗi khi ghi file db.json:', err);
                return res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm số.' });
            }
            res.json({ success: true });
        });

    });
});

app.post('/forgot', (req, res) => {
    const { newPass, againPass, username } = req.body;

    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Đã xảy ra lỗi khi đọc file db.json:', err);
            return res.status(500).json({ error: 'Đã xảy ra lỗi khi đổi mật khẩu.' });
        }
        const currentData = JSON.parse(data);
        const userIndex = currentData.user.findIndex(user => user.username === username);
        if (newPass === againPass) {
            currentData.user[userIndex].password = newPass;
            fs.writeFile(dbFilePath, JSON.stringify(currentData), (err) => {
                if (err) {
                    console.error('Đã xảy ra lỗi khi ghi file db.json:', err);
                    toast.error("Đổi mật khẩu thất bại: " + err.message);
                    return res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm số.' });

                }
                toast.success("Đổi mật khẩu thành công!")
                res.json({ success: true, message: 'Đăng nhập thành công' });
            });
        } else {
            return res.status(400).json({ error: 'Mật khẩu mới không khớp!' });
        }
    })
})

app.post('/contact', (req, res) => {
    const { name, email, phone, mess } = req.body;
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error', err);
            return res.status(500).json({ error: "Error add mess" });
        }

        const dataContact = JSON.parse(data);
        dataContact.contact.push({ name, email, phone, mess });
        fs.writeFile(dbFilePath, JSON.stringify(dataContact), (err) => {
            if (err) {
                console.error('Error writefile', err);
                return res.status(500).json({ error: 'Error add write contact' })
            }
            toast.success("Sent!")
            res.json({ success: true });
        })
    })
});


app.post('/logout', async (req, res) => {
    return res.status(200).json({ message: 'Logout successful' });
});



app.get('/getDataGr', async (req, res) => {
    try {
        const data = await fs.promises.readFile(dbFilePath, 'utf8');
        const parsedData = JSON.parse(data);
        res.json({ success: true, group: parsedData.group1 });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy dữ liệu' });
    }
})

app.post('/addGrLv1', async (req, res) => {
    const { leverGr, valueNamegr, valueRv, valueInheritance } = req.body;
    try {
        let data = await fs.promises.readFile(dbFilePath, 'utf8');
        const dataAdd = JSON.parse(data);
        const maxId = Math.max(...dataAdd.group1.map(item => item.id));
        const id = maxId >= 0 ? maxId + 1 : 1;
        dataAdd.group1.push({ id, leverGr, valueNamegr, valueRv, valueInheritance });
        await fs.promises.writeFile(dbFilePath, JSON.stringify(dataAdd));
        res.json({ success: true, group: dataAdd.group1 });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Error adding contact' });
    }
});

app.post('/deleteGrLv1', async (req, res) => {
    const { id } = req.body;
    try {
        let data = await fs.promises.readFile(dbFilePath, 'utf8');
        const dataDelete = JSON.parse(data);
        dataDelete.group1 = dataDelete.group1.filter(item => item.id !== id);
        await fs.promises.writeFile(dbFilePath, JSON.stringify(dataDelete));
        res.json({ success: true, group: dataDelete.group1 });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Error deleting contact' });
    }
});

app.post('/editDataGr', async (req, res) => {
    const { id, valueNamegr, valueRv } = req.query;
    try {
        let data = await fs.promises.readFile(dbFilePath, 'utf8');
        const grData = JSON.parse(data);
        const idToFind = typeof grData.group1[0].id === 'number' ? Number(id) : id;
        const index = grData.group1.findIndex(group1 => group1.id === idToFind);
        if (index !== -1) {
            grData.group1[index].valueNamegr = valueNamegr;
            grData.group1[index].valueRv = valueRv;
            await fs.promises.writeFile(dbFilePath, JSON.stringify(grData, null, 2)); // Thêm `null, 2` để định dạng JSON đẹp hơn
            res.json({ success: true, group1: grData.group1 });
        } else {
            res.status(404).json({ error: 'Không tìm thấy phần tử để cập nhật' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật dữ liệu' });
    }
});


app.get('/grDatatest', async (req, res) => {
    let data = await fs.promises.readFile(dbFilePath, "utf8");
    const parsedData = JSON.parse(data);
    res.json({ success: true, dataGroup: parsedData.group1 });
})
app.post('/addpersonnel', async (req, res) => {
    const { name, email, group, position, phone } = req.query;

    try {
        let data = await fs.promises.readFile(dbFilePath, 'utf8');
        const dataPersonnel = JSON.parse(data)
        const maxId = Math.max(...dataPersonnel.personnel.map(item => item.id));
        const id = maxId >= 0 ? maxId + 1 : 1;
        dataPersonnel.person.push({ id, name, email, group, position, phone });
        await fs.promises.writeFile(dbFilePath, JSON.stringify(dataPersonnel));
        res.json({ success: true, personnel: dataPersonnel.personnel });
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật dữ liệu' });
    }
});

app.post('/editProfileAccount', async (req, res) => {
    const { id, phone } = req.query;
    try {
        let data = await fs.promises.readFile(dbFilePath, 'utf8');
        const dataPfAcc = JSON.parse(data);
        const index = dataPfAcc.personnel.findIndex(personnel => personnel.id === parseInt(id))
        dataPfAcc.personnel[index].phone = phone;
        await fs.promises.writeFile(dbFilePath, JSON.stringify(dataPfAcc));
        res.json({ success: true, personnel: dataPfAcc.personnel });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật dữ liệu' });
    }
})



// getDataPerson1
app.get("/getDataPerson", async (req, res) => {
    try {
        let data = await fs.promises.readFile(dbFilePath, "utf8");
        const parsedData = JSON.parse(data);
        res.json({ success: true, person: parsedData.person });
    } catch (err) {
        console.error("Error getting data person:", err);
        res.status(500).json({ error: "Error getting data person" });
    }
});


//add
app.post("/addPerson", async (req, res) => {
    const { email, name, phone, group, position, status } = req.body;
    try {
        let data = await fs.promises.readFile(dbFilePath, "utf8");
        const dataAdd = JSON.parse(data);
        const maxId = Math.max(...dataAdd.person.map((item) => item.id));
        const id = maxId >= 0 ? maxId + 1 : 1;
        dataAdd.person.push({ id, email, name, phone, group, position, status });
        await fs.promises.writeFile(dbFilePath, JSON.stringify(dataAdd));
        res.json({ success: true, person: dataAdd.person });
    } catch (err) {
        console.error("Error adding person:", err);
        res.status(500).json({ error: "Error adding person" });
    }
});
//update
app.put("/updatePerson/:id", async (req, res) => {
    const { id } = req.params;
    const { email, name, phone, group, position, status } = req.body;
    try {
        let data = await fs.promises.readFile(dbFilePath, "utf8");
        let dataUpdate = JSON.parse(data);

        // Tìm và cập nhật thông tin nhân sự theo id
        const personIndex = dataUpdate.person.findIndex((item) => item.id == id);
        if (personIndex === -1) {
            return res.status(404).json({ error: "Person not found" });
        }

        dataUpdate.person[personIndex] = {
            id: Number(id),
            email,
            name,
            phone,
            group,
            position,
            status,
        };
        await fs.promises.writeFile(dbFilePath, JSON.stringify(dataUpdate));
        res.json({ success: true, person: dataUpdate.person });
    } catch (err) {
        console.error("Error updating person:", err);
        res.status(500).json({ error: "Error updating person" });
    }
});
//delete
app.delete("/deletePerson/:id", async (req, res) => {
    const { id } = req.params;
    try {
        let data = await fs.promises.readFile(dbFilePath, "utf8");
        let dataUpdate = JSON.parse(data);

        // Tìm và xóa thông tin nhân sự theo id
        const personIndex = dataUpdate.person.findIndex((item) => item.id == id);
        if (personIndex === -1) {
            return res.status(404).json({ error: "Person not found" });
        }

        dataUpdate.person.splice(personIndex, 1); // Xóa người dùng khỏi danh sách
        await fs.promises.writeFile(dbFilePath, JSON.stringify(dataUpdate));
        res.json({ success: true, person: dataUpdate.person });
    } catch (err) {
        console.error("Error deleting person:", err);
        res.status(500).json({ error: "Error deleting person" });
    }
});
// search
app.get("/searchPerson", async (req, res) => {
    const { query } = req.query;
    try {
        let data = await fs.promises.readFile(dbFilePath, "utf8");
        const dataSearch = JSON.parse(data);
        const filteredData = dataSearch.person.filter((person) =>
            Object.values(person).some((value) =>
                value.toString().toLowerCase().includes(query.toLowerCase())
            )
        );
        res.json({ success: true, person: filteredData });
    } catch (err) {
        console.error("Error searching person:", err);
        res.status(500).json({ error: "Error searching person" });
    }
});

app.post('/addPersonToTheGroup', async (req, res) => {
    const { id, levelGroup, keyIdGroup } = req.query;
    const targetIds = id.split(',').map(ids => parseInt(ids, 10));
    const keyIdGroupArray = keyIdGroup.split(',').map(key => parseInt(key, 10));
    const groupKeyArray = levelGroup.split(',').map(key => parseInt(key, 10));
    try {
        let data = await fs.promises.readFile(dbFilePath, 'utf8');
        const dataUserss = JSON.parse(data);
        const updatedPersons = dataUserss.person.map(person => {
            if (targetIds.includes(person.id)) {
                const currentKeyIdGroup = Array.isArray(person.keyIdGroup) ? person.keyIdGroup : [];
                const newKeyIdGroup = [...new Set([...currentKeyIdGroup, ...keyIdGroupArray])];
                const currentLevelGroup = Array.isArray(person.groupKey) ? person.groupKey : [];
                const newGroupKey = [...new Set([...currentLevelGroup, ...groupKeyArray])]
                return { ...person, groupKey: newGroupKey, keyIdGroup: newKeyIdGroup };
            }
            return person;
        });
        dataUserss.person = updatedPersons;
        await fs.promises.writeFile(dbFilePath, JSON.stringify(dataUserss));

        res.json({
            success: true,
            persons: updatedPersons,
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error updating person data' });
    }
});



app.post('/deleteKeyIdGroup', async (req, res) => {
    const { groupKey, keyIdGroup, idPerson } = req.query;
    try {
        let data = await fs.promises.readFile(dbFilePath, 'utf8');
        const dataUserss = JSON.parse(data);
        const keyIdGroupToDelete = Number(keyIdGroup);
        const groupKeyToDelete = Number(groupKey);
        dataUserss.person.forEach(person => {
            if (Array.isArray(person.keyIdGroup)) {
                person.keyIdGroup = person.keyIdGroup.filter(group => group !== keyIdGroupToDelete);
                if (Array.isArray(person.groupKey)) {
                    person.groupKey = person.groupKey.filter(group => group !== groupKeyToDelete);
                }
            }
        });

        await fs.promises.writeFile(dbFilePath, JSON.stringify(dataUserss, null, 2));
        res.json({ success: true, person: dataUserss.person });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa thuộc tính keyIdGroup' });
    }
});




////////////////////////////

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
