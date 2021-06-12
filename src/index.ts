import * as fetch from "node-fetch";

interface Package {
    name: string;
    version: string;
    author: string;
    type: string;
    license: string;
    url?: string;
    keywords?: Array<string>;
    filename?: string;
}

export class API{
    /**
     * @constructor
     * @param {str} name name of your user in flim package index
     * @param {str} password password of your user in flim package index
     * @param {str|none} host
     */
    name:string;
    password:string;
    host:string;
    constructor(name?: string, password?: string, host?: string){
        this.name = name;
        this.password = password;
        this.host = host || "https://flimjs.herokuapp.com/api" //test server
    }
    /**
     * Get info about package
     * @param {str} name name of package
     * @returns response in json format
     */
    async getPackage(name){
        let res = await fetch(`${this.host}/package/${name}`);
        if(res.status!==200) return res.status+" "+res.statusText;
        return res.json();
    }
    /**
     * Uploads package
     * @param {Object} pkg body of package
     * @returns response in json format
     */
    async uploadPackage(pkg:Package){
        let res = await fetch(`${this.host}/package/`, {
            method: 'post',
            body: JSON.stringify({
                auth: {
                    name:this.name,
                    password:this.password
                },
                package: pkg
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        if(res.status!==200) return res.status+" "+res.statusText;
        return res.json();
    }
    /**
     * Register in flim package index
     * @returns response in json format
     */
    async register(){
        let res = await fetch(`${this.host}/reg/`, {
            method: 'post',
            body: JSON.stringify({
                    name:this.name,
                    password:this.password
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        if(res.status!==200) return res.status+" "+res.statusText;
        return res.json();
    }
}