import Savable from "./Savable";

export class LStorage
{
    private wasLastSessionSet = false;

    savables = new Map<string, Savable<any>>;

    addSavables(savable: Savable<any>): boolean
    {
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
        this.savables.forEach((savable) => savable.reset())
    }

    loadLast()
    {
        this.savables.forEach((savable, key) => 
        {
            savable.reconstruct(this.getObject(key));
        })
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

    private constructor() {};

    public static getInstance(): LStorage
    {
        if (!LStorage.instance) {
            LStorage.instance = new LStorage();
        }

        return LStorage.instance;
    }

    private static instance: LStorage;
}