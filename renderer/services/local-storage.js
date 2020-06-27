import uid from 'uid-promise'

export const getUser = () => {
    const user = JSON.parse(localStorage.getItem('snipnote'))
    if (user) {
        return user
    }

    const cfg = {
        user: {
            name: '',
            notes: [],
            projects: [{
                id: 'untitled',
                title: 'untitled',
                hex: '#6275ff',
                isSelected: true
            }],
            onboard: false,
            mode: 'dark',
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
    }
    localStorage.setItem('snipnote', JSON.stringify(cfg))
    return cfg;
}

export const updateUser = (user) => {
    user.updatedAt = Date.now();
    return localStorage.setItem('snipnote', JSON.stringify({ user }));
}

export const setNote = ({ title, project, note, checklist, tab = 'Today' }) => {
    return new Promise( (resolve, reject) => {
        if (!title) {
            return reject(new TypeError('title is required'))
        }
        
        const { user } = getUser();
        const id =  uid(20);
        const _note = {
            id,
            title,
            project,
            note,
            checklist,
            completed: false,
            type: tab.toLowerCase(),
            updatedAt: Date.now(),
            createdAt: Date.now(),
        }
        const _notes = [...user.notes, _note];
        user.notes = _notes;
        updateUser(user);
       
        return resolve(user);
    })
}

export const getNote = (id) => {
    return new Promise((resolve, reject) => {
        const { user } = getUser();
        const notes = user.notes;
        const _note = notes.filter(function(n) {
            if (n.id === id) {
            
                return n;
            }
        });
        if (_note) {

            return resolve(_note[0]);
        }

        return reject()
    })
}

export const updateNote = ({ id, title, note, project, checklist, completed }) => new Promise((resolve, reject) => {
    const { user } = getUser();
    const { notes } = user;
    const newNotes = notes.map((n) => {
        if (n.id === id) {
            n.id = id;
            n.note = note;
            n.project = project;
            n.checklist = checklist;
            n.title = title;
            n.completed = completed;
            n.updatedAt = Date.now();
            return n;
        }
        return n
    });
    user.notes = newNotes;
    updateUser(user);
    return resolve(user);
});

export const removeNote = (id)=>{
    return new Promise((resolve,reject)=>{
        const {user} = getUser();
        const _notes = user.notes.filter((p)=>{
            if(p.id !== id ){
                return p;
            }
        });
        user.notes = _notes;
        updateUser(user);
        return resolve(user);
    })
}

export const getProject = (Pid) => {
    const { user } = getUser();
    let _project = user.projects.filter(({ id }) => id === Pid);
    if (_project.length === 0) {
        return _project = { id: 'untitled', title: 'untitled', hex: '#6275ff' }
    }
    return _project[0];
}

export const setproject = ({ title, hex }) => {
    return new Promise(async (resolve, reject) => { 
        if (!hex) {
            return reject(TypeError('Select Project Color'))
        }
        const { user } = getUser();
        const _project = {
            id: await uid(10),
            title: title.toLowerCase(),
            hex: hex
        }
        const _projects = [...user.projects, _project];
        user.projects = _projects;
        updateUser(user);
        return resolve(user);
    })
}

export const removeProject = (id, deleteTasks) => {
    return new Promise((resolve, reject) => {
        const { user } = getUser();
        if (deleteTasks) {
            let _notes = user.notes.filter(({ project }) => project !== id);
            user.notes = _notes;
        }
        const projects = user.projects.filter((p) => p.id !== id);
        user.projects = projects;
        updateUser(user);
        resolve(user);
    })
}
