import Savable from "./Savable";

export class LStorage
{
    private wasLastSessionSet = false;

    savables : Map<string, Savable<any>>;

    addSavables(savable: Savable<any>): boolean
    {
        //console.log("Savable: ", savable);

        if (this.savables.has(savable.storageKey)) 
            return false;
        
            this.savables.set(savable.storageKey, savable);
        return true;
    }

    setObject(savable: Savable<any>): void
    {
        localStorage.setItem(savable.storageKey, JSON.stringify(savable.dumpData()));
    }
    
    getObject(key: string): object[]
    {
        var value = localStorage.getItem(key);
        if(!value) return [];
        return value && JSON.parse(value);
    }

    getObjectJSON(key: string): JSON
    {
        var value = localStorage.getItem(key);
        return value && JSON.parse(value);
    }

    saveObjects()
    {
        this.savables.forEach((savable, key) => 
        {
            (this.setObject(savable));
            //console.log(this.getObject(key));
        })
    }

    resetObjects()
    {
        this.savables.forEach((savable) => savable.reset());
        this.saveObjects();
    }

    loadLast()
    {
        this.savables.forEach((savable, key) => 
        {
            savable.reconstruct(this.getObject(key));
        })
    }

    loadSavable(savableKey: string)
    {
        const savable = this.savables.get(savableKey);
        
        savable?.reconstruct(this.getObject(savableKey));
    }

    clear()
    {
        this.savables.forEach((value, key) =>
        {
            value.clear();
        })
    }

    loadDefault() 
    {
        this.savables.forEach((savable, key) => 
        {
            savable.loadDefault();
        })
    }

    loadIfPossible(): void
    {
        if (localStorage.getItem("isSet") != "true")
        {
            localStorage.setItem("isSet", "true");
            this.loadDefault();
        }
        else
        {
            this.wasLastSessionSet = true;
            this.loadLast();
            this.saveObjects();
        }
    }

    download(name: string)
    {
        let content: Object[] = [];

        this.savables.forEach((savable, key) => 
        {
            content.concat(this.getObject(key));
        })

        const blob = new Blob([JSON.stringify(content)], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
    
        const a = document.createElement('a');
        a.href = url;
        a.download = name || "nazwa pliku.JSON";
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    private constructor() 
    {
        this.savables = new Map<string, Savable<any>>;
    };

    public static getInstance(): LStorage
    {
        if (!LStorage.instance) {
            LStorage.instance = new LStorage();
        }

        return LStorage.instance;
    }

    private static instance: LStorage;
}