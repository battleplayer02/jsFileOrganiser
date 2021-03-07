let fs = require('fs');
let path = require('path')

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb", "msi"],
    htmlPage: ['html', "htm"],
    ppt: ['pptx', "ppt"],
    img: ['png', 'jpg',"jpeg"]
}

function getFolderName(dirpath) {
    let ext = dirpath.split('.').pop();

    // console.log(ext);
    for (const extContains in types) {
        for (var i = 0; i < types[extContains].length; i++) {
            // console.log(types[extContains][i]);
            if (types[extContains][i] == ext) {
                return extContains;
            }
        }
    }
    return 'other'

}

function isFileorNot(dirpath) {
    return fs.lstatSync(dirpath).isFile();
}

function listContent(dirpath) {
    return fs.readdirSync(dirpath)
}




function organise(dirpath) {
    let newdirpath = path.join(dirpath, 'org')

    fs.mkdir(path.join(dirpath, 'org'), (err) => {
        // console.log('Directory created successfully!');
    });


    for (const item of Object.entries(types)) {
        let makefolderpath = path.join(newdirpath, item[0])
        fs.mkdir(makefolderpath, (err) => {
            // console.log('Directory created successfully!');
        });
    }

    fs.mkdir(path.join(newdirpath, 'others'), (err) => {
        // err ? null : null;
    })

    let toprint = dirpath.split('\\').pop();


    function viewFlat(dirpath, toprint) {
        if (isFileorNot(dirpath)) {
            let foldername = getFolderName(dirpath)
            console.log(foldername);
            // console.log(foldername);
            let filename = dirpath.split('\\').pop();
            // console.log(filename);
            let dest = path.join(path.join(newdirpath, foldername), filename);
            // console.log(dest);
            fs.rename(dirpath, dest, function (err) {
            })
        }
        let content = !isFileorNot(dirpath) ? listContent(dirpath) : -1;
        content !== -1 ? content.forEach((data, idx) => {
            let childpath = dirpath + "\\" + data;
            viewFlat(childpath, toprint + "\\" + data);
        }) : null;
    }
    viewFlat(dirpath);
}
module.exports = organise;