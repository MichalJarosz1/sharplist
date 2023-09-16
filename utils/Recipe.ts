import { LStorage } from "./LStorage";
import Savable from "./Savable";
import { ProductMap, ProductDump, Product } from "./Product";

interface RecipeDump
{
    ID: number;
    Name: string;
    Number: number;
    Products: ProductDump[];
    Tags: string;
}

export class Recipe
{
    private static IDsCreated = 10000000;

    static productMapHandle: ProductMap = ProductMap.getInstance();

    private ID!: number;

    constructor(private Name: string, private Number: number, private Products: ProductDump[], private Tags: string, id?: number)
    {
        if(!id)
        {
            this.ID = (Date.now() - 1690000000000) * 20000 + Recipe.IDsCreated++;
        }
        else
        {
            this.ID = id;
        }
    }

    private static NotValidInstance = new Recipe("", 0, [], "", -1);

    static get NotValid(): Recipe
    {
        return Recipe.NotValidInstance;
    }

    set name(name: string)
    {
        this.Name = name;
    }
    get name(): string
    {
        return this.Name;
    }
    
    get number(): number
    {
        return this.Number;
    }
    set number(number: number)
    {
        this.Number = number;
    }
    
    set products(products: ProductDump[])
    {
        this.Products = products;
    }

    get products(): ProductDump[]
    {
        return this.Products;
    }

    set tags(tags: string)
    {
        this.Tags = tags;
    }
    get tags(): string
    {
        return this.Tags;
    }

    get id(): number
    {
        return this.ID;
    }

    getProductDumpByID(id: number): ProductDump | undefined
    {
        return this.Products.find( val => val.ArticleID === id)
    }

    getFullProductCopyByID(id: number): Product | undefined
    {
        const productShort = this.Products.find( val => val.ArticleID === id);
        const productFull = Recipe.productMapHandle.getByID(id);

        if(!productShort || !productFull) 
            return undefined;

        return new Product(productFull.Name, productShort.Number, productFull.Unit, productFull.Tags, productShort.ArticleID);
    }

    static fullProductName(id: number): string | undefined
    {
        return Recipe.productMapHandle.getByID(id)?.Name;
    }

    //ProductNumber not needed. You will get from this.Products[i].Number as it is productDump type

    static fullProductUnit(id: number): string | undefined
    {
        return Recipe.productMapHandle.getByID(id)?.Unit;
    }

    static fullProductTags(id: number): string | undefined
    {
        return Recipe.productMapHandle.getByID(id)?.Tags;
    }


    dumpRecipe(): RecipeDump
    {
        return {
            ID:         this.ID,
            Name:       this.Name,
            Number:     this.Number,
            Products:   this.Products,
            Tags:       this.Tags
        };
    }

    sortProducts(): void //never done anything similar
    {
        let list = new Array<ProductDump>;

        Recipe.productMapHandle.forEach(mapValue =>
        {
            (this.Products.forEach(ArrayItem => 
            {
                if(ArrayItem.ArticleID === mapValue.ID)
                    list.push(ArrayItem)
            }))
        });
        this.Products = list;
    }

    getSorted(): Product[]
    {
        const allFullProducts = Recipe.productMapHandle.array; // don't change content;

        const present: Product[] = [];
        const absent: Product[] = [];

        for (let i = 0; i < allFullProducts.length; i++) 
        {
            const product = allFullProducts[i];
            const shortProduct = this.getProductDumpByID(product.ID);
            if (shortProduct && shortProduct.Number>0)
                present.push(new Product(product.Name, shortProduct.Number, product.Unit, product.Tags, product.ID));
            else
                absent.push(new Product(product.Name, 0, product.Unit, product.Tags, product.ID));
        }



        return present.concat(absent);
    }

    getSearchSorted(word: string): Product[]
    {
        const searched = Recipe.productMapHandle.getSearch(word);

        const present: Product[] = [];
        const absent: Product[] = [];

        for (let i = 0; i < searched.length; i++) 
        {
            const product = searched[i];
            const shortProduct = this.getProductDumpByID(product.ID);
            if (shortProduct)
                present.push(new Product(product.Name, shortProduct.Number, product.Unit, product.Tags, product.ID));
            else
                present.push(new Product(product.Name, 0, product.Unit, product.Tags, product.ID));
        }

        present.sort((a, b) => 
        {
            if (a.Number > 0 && b.Number === 0)
                return -1;
            else if (a.Number === 0 && b.Number > 0)
                return 1;
            else 
                return 0;
        });

        return present.concat(absent);
    }


    indexOf(id: number): number
    {
        return this.Products.findIndex(value => value.ArticleID === id );
    }

    hasProductOfID(id: number): boolean
    {
        return this.Products.some( p => p.ArticleID === id );
    }

    printFull(): string
    {
        let content = "";

        this.Products.forEach(p => 
        {
            content += Recipe.productMapHandle.getByID(p.ArticleID)?.Name + " " 
            + Number(Number(p.Number).toPrecision(4)) + " " 
            + Recipe.productMapHandle.getByID(p.ArticleID)?.Unit + "\n";
        })

        return this.Name + " " + "\n" + content;
    }

    printShort(): string
    {
        
        return this.Name + " " + (this.Number === 0 ? "" : Number(Number(this.Number).toPrecision(4)) );
    }

    printProductsOnly(): string
    {
        let content = "";

        this.Products.forEach(p => 
        {
            content += Recipe.productMapHandle.getByID(p.ArticleID)?.Name + " " + Number(Number(p.Number).toPrecision(4))  + " ";
        })

        return content;
    }

    flatline()
    {
        this.Number = 0;
        this.Products.forEach(product => { product.Number = 0});
    }

    removeProduct(id: number): void
    {
        this.Products = this.Products.filter((product) => product.ArticleID !== id);
    }
}

export class RecipeMap implements Savable<RecipeDump>
{
    static instance: RecipeMap;

    static getInstance(): RecipeMap {
        if (!RecipeMap.instance) {
            RecipeMap.instance = new RecipeMap(ProductMap.getInstance());
        }

        return RecipeMap.instance;
    }
    TabID: string = "gridContentRecipies";


    private m_Data: Recipe[] = [];

    get array(): Recipe[]
    {
        return this.m_Data;
    }

    get storageKey(): string
    {
        return "recipe_list_list";
    }


    forEach(callback: (value: Recipe) => void) 
    {
        this.m_Data.forEach((value) => 
        {
            callback(value);
        });
    }

    private constructor(private productMapHandle: ProductMap)
    {
        
    }

    clear(): void {
        this.m_Data = [];
    }

    loadDefault(): void {

        const productMapHandle = this.productMapHandle;

        if(productMapHandle.array.length === 0)
            productMapHandle.loadDefault();


    const defaultSettingRecipies = 
    [
        new Recipe("Rosół", 0, [
           productMapHandle.getProductDump("kurczak na rosół", 1),
           productMapHandle.getProductDump("marchewka", 0.3),
           productMapHandle.getProductDump("cebula", 0.3),
           productMapHandle.getProductDump("por", 1),
           productMapHandle.getProductDump("sól", 0.01),
           productMapHandle.getProductDump("pieprz", 0.01),
           productMapHandle.getProductDump("ziele angielskie", 0.1),
           productMapHandle.getProductDump("liść laurowy", 0.2),
        ], "niedziela, zupa, kurczak"),

        new Recipe("Mizeria", 0, [
            productMapHandle.getProductDump("ogórek", 2),
            productMapHandle.getProductDump("śmietana gęsta 20", 0.5),
            productMapHandle.getProductDump("cytryna", 0.05),
            productMapHandle.getProductDump("sól", 0.01),
            productMapHandle.getProductDump("pieprz", 0.01),
        ], "niedziela" ),

        new Recipe("Saganaki", 0, [
            productMapHandle.getProductDump("kiełbasa", 1),
            productMapHandle.getProductDump("papryka", 2),
            productMapHandle.getProductDump("białe wino", 0.07),
            productMapHandle.getProductDump("feta", 2),
            productMapHandle.getProductDump("koncentrat pomidory", 1),
            productMapHandle.getProductDump("musztarda", 0.5),
            productMapHandle.getProductDump("sól", 0.01),
            productMapHandle.getProductDump("pieprz", 0.01),
            productMapHandle.getProductDump("oregano", 0.1),
            productMapHandle.getProductDump("olej", 0.1)
        ],
        "tydzień, szybkie, kiełbasa",
        ),

        new Recipe("Bigos", 0, [
            productMapHandle.getProductDump("kiełbasa", 1),
            productMapHandle.getProductDump("cebula", 0.15),
            productMapHandle.getProductDump("kostki rosołowe", 0.1),
            productMapHandle.getProductDump("kiszona kapusta", 2),
            productMapHandle.getProductDump("koncentrat pomidory", 1),
            productMapHandle.getProductDump("mąka", 0.05),
            productMapHandle.getProductDump("masło", 0.1),
            productMapHandle.getProductDump("olej", 0.1)
        ],
        "tydzień, kiełbasa",
        ),

        new Recipe("Leczo", 0, [
            productMapHandle.getProductDump("kiełbasa", 1),
            productMapHandle.getProductDump("cebula", 0.35),
            productMapHandle.getProductDump("czosnek", 0.1),
            productMapHandle.getProductDump("papryka", 3),
            productMapHandle.getProductDump("cukinia", 3),
            productMapHandle.getProductDump("przecier pomidorowy", 1), 
            productMapHandle.getProductDump("sól", 0.01),
            productMapHandle.getProductDump("pieprz", 0.01),
            productMapHandle.getProductDump("papryka słodka", 0.25),
            productMapHandle.getProductDump("papryka ostra", 0.05),
            productMapHandle.getProductDump("oregano", 0.25),
            productMapHandle.getProductDump("olej", 0.1),
        ],
        "tydzień, kiełbasa", 
        ),

        new Recipe("Fasolka po bretońsku", 0, [
            productMapHandle.getProductDump("fasola", 2),
            productMapHandle.getProductDump("boczek", 0.5),
            productMapHandle.getProductDump("kiełbasa", 0.5),
            productMapHandle.getProductDump("cebula", 0.15),
            productMapHandle.getProductDump("czosnek", 0.1),
            productMapHandle.getProductDump("pomidory krojone", 1),
            productMapHandle.getProductDump("koncentrat pomidory", 1),
            productMapHandle.getProductDump("ziele angielskie", 0.1),
            productMapHandle.getProductDump("liść laurowy", 0.2),
            productMapHandle.getProductDump("majeranek", 0.2)
        ],
        "kiełbasa",
        ),

        new Recipe("Zupa meksykańska", 0, [
            productMapHandle.getProductDump("mięso mielone", 2),
            productMapHandle.getProductDump("kukurydza", 3),
            productMapHandle.getProductDump("papryka", 2),
            productMapHandle.getProductDump("fasola czerwona", 3),
            productMapHandle.getProductDump("pomidory krojone", 3),
            productMapHandle.getProductDump("koncentrat pomidory", 1),
            productMapHandle.getProductDump("czosnek", 0.3),
            productMapHandle.getProductDump("cebula", 0.35),
            productMapHandle.getProductDump("sól", 0.01),
            productMapHandle.getProductDump("pieprz", 0.01),
            productMapHandle.getProductDump("papryka słodka", 1),
            productMapHandle.getProductDump("papryka ostra", 0.2),
            productMapHandle.getProductDump("oregano", 0.15),
            productMapHandle.getProductDump("bazylia", 0.15),
            productMapHandle.getProductDump("przyprawy meksykańskie", 1),
            productMapHandle.getProductDump("zioła prowansalskie", 0.15),
            productMapHandle.getProductDump("ziele angielskie", 0.1),
            productMapHandle.getProductDump("liść laurowy", 0.2),
            productMapHandle.getProductDump("kostki rosołowe", 0.1),
            productMapHandle.getProductDump("olej", 0.1)
        ],
        "tydzień, zupa, mielone"
        ),

        new Recipe("Burrito", 0, [
            productMapHandle.getProductDump("mięso mielone", 2),
            productMapHandle.getProductDump("cebula", 0.2),
            productMapHandle.getProductDump("czosnek", 0.1),
            productMapHandle.getProductDump("jalapeno", 0.05),
            productMapHandle.getProductDump("pomidor", 0.3),
            productMapHandle.getProductDump("kostki rosołowe", 0.5), 
            productMapHandle.getProductDump("pomidory krojone", 1),
            productMapHandle.getProductDump("fasola czerwona", 2),
            productMapHandle.getProductDump("placki tortilli", 3),
            productMapHandle.getProductDump("ser żółty", 0.3),
            productMapHandle.getProductDump("śmietana gęsta 20", 0.3),
            productMapHandle.getProductDump("kmin rzymski", 0.1),
            productMapHandle.getProductDump("cayenne", 0.01),
            productMapHandle.getProductDump("papryka ostra", 0.05),
            productMapHandle.getProductDump("oregano", 0.2),
            productMapHandle.getProductDump("olej", 0.1)
            ],
            "tydzień, mielone"
        ),

        new Recipe("Tortilla kurczak", 0, [
            productMapHandle.getProductDump("filet kurczaka", 1),
            productMapHandle.getProductDump("cebula", 0.2),
            productMapHandle.getProductDump("papryka", 1),
            productMapHandle.getProductDump("czosnek", 0.15),
            productMapHandle.getProductDump("jalapeno", 0.05),
            productMapHandle.getProductDump("pomidor", 0.3),
            productMapHandle.getProductDump("sałata lodowa", 0.5),
            productMapHandle.getProductDump("pieczarki", 1),
            productMapHandle.getProductDump("placki tortilli", 3),
            productMapHandle.getProductDump("ser żółty", 0.3),
            productMapHandle.getProductDump("kukurydza", 1),
            productMapHandle.getProductDump("jogurt nat.", 1),
            productMapHandle.getProductDump("przyprawa do gyrosa", 0.7),
            productMapHandle.getProductDump("sól", 0.01),
            productMapHandle.getProductDump("pieprz", 0.01),
            productMapHandle.getProductDump("olej", 0.1), 
            productMapHandle.getProductDump("majonez", 0.2),
            productMapHandle.getProductDump("keczup", 0.1),
            productMapHandle.getProductDump("cytryna", 0.05),
            productMapHandle.getProductDump("ogórek", 1),
            ],
            "tydzień, kurczak"
        ),


        new Recipe("Sałatka z kurczaka", 0,  [
            productMapHandle.getProductDump("filet kurczaka", 1.5),
            productMapHandle.getProductDump("papryka", 2),
            productMapHandle.getProductDump("ryż", 3),
            productMapHandle.getProductDump("majonez", 0.3),
            productMapHandle.getProductDump("jajka", 0.3),
            productMapHandle.getProductDump("keczup", 0.3),
            productMapHandle.getProductDump("sól", 0.01),
            productMapHandle.getProductDump("pieprz", 0.01),
            productMapHandle.getProductDump("ogórek kiszony", 0.2),
            productMapHandle.getProductDump("kukurydza", 1),
            productMapHandle.getProductDump("olej", 0.1)
            ],
            "tydzień, kurczak"
        ),

        new Recipe("Gulasz", 0,  [
            productMapHandle.getProductDump("schab wieprzowy", 1),
            productMapHandle.getProductDump("boczek", 0.2),
            productMapHandle.getProductDump("cebula", 0.2),
            productMapHandle.getProductDump("marchewka", 0.2),
            productMapHandle.getProductDump("papryka", 1),
            productMapHandle.getProductDump("pieczarki", 1),
            productMapHandle.getProductDump("koncentrat pomidory", 1),
            productMapHandle.getProductDump("sól", 0.01),
            productMapHandle.getProductDump("pieprz", 0.01),
            productMapHandle.getProductDump("papryka słodka", 0.3),
            productMapHandle.getProductDump("papryka ostra", 0.08),
            productMapHandle.getProductDump("suszony czosnek", 0.2),
            productMapHandle.getProductDump("kostki rosołowe", 0.1),
            productMapHandle.getProductDump("ziele angielskie", 0.1),
            productMapHandle.getProductDump("liść laurowy", 0.1),
            productMapHandle.getProductDump("olej", 0.1)
            ],
            "tydzień, wieprzowina"
        ),

        new Recipe("Placki ziemniaczane", 0,  [
            productMapHandle.getProductDump("ziemniak", 0.3),
            productMapHandle.getProductDump("mąka", 0.05),
            productMapHandle.getProductDump("cebula", 0.1),
            productMapHandle.getProductDump("jajka", 0.1),
            productMapHandle.getProductDump("sól", 0.01),
            productMapHandle.getProductDump("olej", 0.1)
            ],
            "tydzień"
        ),

        new Recipe("Alfredo", 0, [
            productMapHandle.getProductDump("filet kurczaka", 1.5),
            productMapHandle.getProductDump("makaron penne", 1.5),
            productMapHandle.getProductDump("śmietana płynna 30", 2),
            productMapHandle.getProductDump("parmesan/gran padano", 2),
            productMapHandle.getProductDump("suszony czosnek", 0.2),
            productMapHandle.getProductDump("gałka muszkatowa", 0.1),
            productMapHandle.getProductDump("sól", 0.01),
            productMapHandle.getProductDump("pieprz", 0.01),
            productMapHandle.getProductDump("olej", 0.1)
            ],
            "tydzień, szybkie"
        ),

        new Recipe("Chińczyk", 0, [
            productMapHandle.getProductDump("filet kurczaka", 1.5),
            productMapHandle.getProductDump("ryż", 0.5),
            productMapHandle.getProductDump("przyprawa do gyrosa", 1),
            productMapHandle.getProductDump("sos chiński", 1), //fix
            productMapHandle.getProductDump("sól", 0.01),
            productMapHandle.getProductDump("pieprz", 0.01),
            productMapHandle.getProductDump("olej", 0.1)
            ],
            "tydzień"
        ),
        
        new Recipe("Frytki po texańsku", 0, [
            productMapHandle.getProductDump("frytki mrożone", 0.4),
            productMapHandle.getProductDump("boczek", 0.5),
            productMapHandle.getProductDump("cheddar", 1),
            productMapHandle.getProductDump("łodyga cebuli", 1),
            productMapHandle.getProductDump("keczup", 0.1),
            productMapHandle.getProductDump("jalapeno", 0.1),
            productMapHandle.getProductDump("sól", 0.01),
            productMapHandle.getProductDump("pieprz", 0.01),
            productMapHandle.getProductDump("czosnek", 0.1),
            productMapHandle.getProductDump("jogurt nat.", 0.4),
            productMapHandle.getProductDump("cytryna", 0.02),
            productMapHandle.getProductDump("majonez", 0.3),
            productMapHandle.getProductDump("olej", 0.1)
            ],
            "weekend, boczek"
        ),

        new Recipe("Pizza", 0,  [
            productMapHandle.getProductDump("salami/peperoni", 5),
            productMapHandle.getProductDump("mozzarella", 3),
            productMapHandle.getProductDump("pieczarki", 1),
            productMapHandle.getProductDump("papryka", 2),
            productMapHandle.getProductDump("cebula", 2),
            productMapHandle.getProductDump("kukurydza", 1),
            productMapHandle.getProductDump("jalapeno", 0.05),
            productMapHandle.getProductDump("mąka", 1.5),
            productMapHandle.getProductDump("drożdże", 1),
            productMapHandle.getProductDump("sól", 0.02),
            productMapHandle.getProductDump("cukier", 0.02),
            productMapHandle.getProductDump("pieprz", 0.01),
            productMapHandle.getProductDump("bazylia", 0.3),
            productMapHandle.getProductDump("oregano", 0.3),
            productMapHandle.getProductDump("koncentrat pomidory", 1),
            productMapHandle.getProductDump("przecier pomidorowy", 1),
            productMapHandle.getProductDump("pomidory krojone", 1),
            productMapHandle.getProductDump("olej", 0.07)
            ],
            "czasochłonne"
        ),

        new Recipe("Burgery", 0, [
            productMapHandle.getProductDump("burgery", 3),
            productMapHandle.getProductDump("bułki do burgera", 4),
            productMapHandle.getProductDump("ogórek kiszony", 0.3),
            productMapHandle.getProductDump("sałata lodowa", 0.5),
            productMapHandle.getProductDump("pomidor", 0.3),
            productMapHandle.getProductDump("cebula", 0.3),
            productMapHandle.getProductDump("keczup", 0.1),
            productMapHandle.getProductDump("majonez", 0.1),
            productMapHandle.getProductDump("jalapeno", 0.05),
            productMapHandle.getProductDump("cheddar", 1),
            productMapHandle.getProductDump("olej", 0.07)
            ],
            "tydzień, mielone"
        ),

        new Recipe("Spaghetti", 0, [
            productMapHandle.getProductDump("makaron spaghetti", 1),
            productMapHandle.getProductDump("mięso mielone",  2),
            productMapHandle.getProductDump("boczek",  0.5),
            productMapHandle.getProductDump("cebula", 0.3),
            productMapHandle.getProductDump("czerwone wino", 0.1),
            productMapHandle.getProductDump("marchewka", 0.1),
            productMapHandle.getProductDump("kostki rosołowe", 0.1),
            productMapHandle.getProductDump("koncentrat pomidory", 1),
            productMapHandle.getProductDump("pomidory krojone", 1),
            productMapHandle.getProductDump("mleko", 0.07),
            productMapHandle.getProductDump("parmesan/gran padano", 0.15),
            productMapHandle.getProductDump("olej", 0.07)
            ],
            "tydzień, mielone"
        ),

        new Recipe("Schabowe", 0, [

            productMapHandle.getProductDump("schabowe", 2),
            productMapHandle.getProductDump("sól", 0.02),
            productMapHandle.getProductDump("pieprz", 0.02),
            productMapHandle.getProductDump("olej", 0.07)
            ],
            "tydzień, wieprzowina"
        ),

        new Recipe("Kordonble", 0,  [
            productMapHandle.getProductDump("cordon bleu", 2),
            productMapHandle.getProductDump("olej", 0.07)
            ],
            "tydzień"
        ),

        new Recipe("Carbonara", 0, [
            productMapHandle.getProductDump("makaron spaghetti", 0.5),
            productMapHandle.getProductDump("boczek",  1.5),
            productMapHandle.getProductDump("jajka",  1),
            productMapHandle.getProductDump("parmesan/gran padano", 1),
            productMapHandle.getProductDump("sól", 0.02),
            productMapHandle.getProductDump("pieprz", 0.02)
            ],
            "weekend"
        ),

        new Recipe("Cygan w rondlu", 0, [
            productMapHandle.getProductDump("schab wieprzowy", 1.5),
            productMapHandle.getProductDump("boczek", 0.2),
            productMapHandle.getProductDump("cebula", 0.2),
            productMapHandle.getProductDump("czosnek", 0.2),
            productMapHandle.getProductDump("ziemniak", 0.8),
            productMapHandle.getProductDump("śmietana gęsta 20", 0.7),
            productMapHandle.getProductDump("piwo", 0.25),
            productMapHandle.getProductDump("sól", 0.01),
            productMapHandle.getProductDump("pieprz", 0.01),
            productMapHandle.getProductDump("papryka słodka", 0.3),
            productMapHandle.getProductDump("papryka ostra", 0.08),
            productMapHandle.getProductDump("ziele angielskie", 0.1),
            productMapHandle.getProductDump("liść laurowy", 0.1),
            productMapHandle.getProductDump("olej", 0.2)
            ],
            "tydzień"
        ),

        new Recipe("Barszcz biały", 0, [
            productMapHandle.getProductDump("kiełbasa", 1),
            productMapHandle.getProductDump("jajka", 8),
            productMapHandle.getProductDump("konc. barsz biały", 1),
            productMapHandle.getProductDump("sól", 0.01),
            productMapHandle.getProductDump("pieprz", 0.01),
            productMapHandle.getProductDump("śmietana płynna 20", 0.5),
            productMapHandle.getProductDump("chrzan", 0.3),
        ], "barszcz",
        ),
        new Recipe("Barszcz czerwony ", 0,  [
            productMapHandle.getProductDump("uszka do barszczu", 2),
            productMapHandle.getProductDump("konc. barsz czerwony", 2),
            productMapHandle.getProductDump("sól", 0.01),
            productMapHandle.getProductDump("pieprz", 0.01),
            ],
            "barszcz"
        ),
        new Recipe("Pomysł na", 0, [
            productMapHandle.getProductDump("schab wieprzowy", 1),
            productMapHandle.getProductDump("cebula", 0.2),
            productMapHandle.getProductDump("marchewka", 0.2),
            productMapHandle.getProductDump("sól", 0.01),
            productMapHandle.getProductDump("pieprz", 0.01),
            productMapHandle.getProductDump("ziele angielskie", 0.1),
            productMapHandle.getProductDump("liść laurowy", 0.1),

        ], "tydzień"),

        new Recipe("Bryndza", 0, [
            productMapHandle.getProductDump("twaróg/ser biały", 1),
            productMapHandle.getProductDump("śmietana płynna 30", 0.1),
            ],
            "śniadanie"
        ),

        new Recipe("Kiełbasa na gorąco", 0, [
            productMapHandle.getProductDump("kiełbasa", 0.5),
            productMapHandle.getProductDump("cebula", 0.1),
            productMapHandle.getProductDump("keczup", 0.1),
            productMapHandle.getProductDump("musztarda", 0.1),
            productMapHandle.getProductDump("olej", 0.1)
            ],
            "śniadanie"
        ),

        new Recipe("Andruty", 0, [
            productMapHandle.getProductDump("masło", 1.5),
            productMapHandle.getProductDump("cukier", 0.3),
            productMapHandle.getProductDump("mleko", 0.2),
            productMapHandle.getProductDump("kakao", 0.1),
            productMapHandle.getProductDump("mleko w proszku", 1),
            ],
            "deser"
        ),

        new Recipe("Surówka", 0, [
            productMapHandle.getProductDump("kapusta", 1),
            productMapHandle.getProductDump("marchewka", 0.3),
            productMapHandle.getProductDump("majonez", 0.2),
            productMapHandle.getProductDump("jabłko", 0.1),
            productMapHandle.getProductDump("pieprz", 0.01)
            ],
            "inne"
        ),

        new Recipe("Podstawowe", 0, [
            productMapHandle.getProductDump("masło", 1),
            productMapHandle.getProductDump("chleb", 3),
            productMapHandle.getProductDump("ser żółty", 0.3),
            productMapHandle.getProductDump("jabłko", 1),
            productMapHandle.getProductDump("banan", 1),
            ],
            "inne"
        ),
    ]

        this.m_Data = [];
        defaultSettingRecipies.forEach(recipe => 
        {
            this.m_Data.push(recipe);
        });
        //console.log("Default recipies initialized. Size: ", this.size);
    }

    dumpData(): RecipeDump[]
    {
            let recipeDumpArray: RecipeDump[] = [];
            for (let recipe of this.m_Data.values())
            {
                recipeDumpArray.push(recipe.dumpRecipe());
            }
            return recipeDumpArray;
    }

    reconstruct(recipies: RecipeDump[]): void 
    {
        this.m_Data = [];

        for (let i = 0; i < recipies.length; i++) {
            const r = recipies[i];
            this.m_Data.push(new Recipe(r.Name, r.Number, r.Products, r.Tags, r.ID))
        }

        //recipies.forEach(element => {
        //    this.m_Data.push(new Recipe(element.Name, element.Number, element.Products, element.Tags, element.ID))
        //});
    }

    getByID(id: number): Recipe | undefined 
    {
        return this.m_Data.find((recipe) => recipe.id === id);
    }

    getByName(name: string) : Recipe | undefined
    {
        return this.m_Data.find((recipe) => recipe.name === name);
    }

    get size(): number
    {
        return this.m_Data.length;
    }

    get length(): number
    {
        return this.m_Data.length;
    }

    getActiveRecipiesForProduct(ArticleID: number): Recipe[]
    {
        return this.m_Data.filter( recipe => recipe.number> 0 && recipe.hasProductOfID(ArticleID));
    }

    editRecipeName(ID: number, name: string): boolean
    {

        if(this.m_Data.find((recipe) => recipe.name === name)) return false;

        const editRecipe = this.m_Data.find((recipe) => recipe.id === ID)
        if(!editRecipe) return false;
        editRecipe.name = name;
        return true;

    }

    editProductNumber(ID: number, number: number): void
    {

        const editRecipe = this.m_Data.find((recipe) => recipe.id === ID)

        if(editRecipe)
        {
            editRecipe.number = number;
        }
    }


    add(name: string, number: number, products: Array<ProductDump>, tags: string, optionalID?: number): boolean
    {
        if(this.m_Data.find((recipe) => recipe.name === name)) return false;

        let newElement = new Recipe(name, number, products, tags, optionalID);
        this.m_Data.push(newElement);
        return true;
    }

    addNew(newRecipe: Recipe): boolean
    {
        if(this.m_Data.find((recipe) => recipe.name === newRecipe.name))
            return false;

        this.m_Data.push(newRecipe);
        return true;
    }

    removeByID(id: number): void
    {
        this.m_Data = this.m_Data.filter((recipe) => recipe.id !== id);
    }

    removeByName(name: string): void
    {
        this.m_Data = this.m_Data.filter((recipe) => recipe.name !== name);
    }

    moveRecipeToIndex(recipeId: number, newIndex: number): void {
        const recipeToMove = this.m_Data.find((recipe) => recipe.id === recipeId);

        if (!recipeToMove || newIndex < 0 || newIndex >= this.m_Data.length) {
          return;
        }
        
        const currentIndex = this.m_Data.indexOf(recipeToMove);

        this.m_Data.splice(currentIndex, 1);
        this.m_Data.splice(newIndex, 0, recipeToMove);
    }

    moveRecipeByID(recipeId: number, shiftProductID: number): void {
        const recipeToShift = this.m_Data.find((recipe) => recipe.id === shiftProductID);
        if(!recipeToShift)
            return;

        const newIndex = this.m_Data.indexOf(recipeToShift);
        const recipeToMove = this.m_Data.find((recipe) => recipe.id === recipeId);
        if (!recipeToMove) {
          return;
        }
        
        const currentIndex = this.m_Data.indexOf(recipeToMove);
        this.m_Data.splice(currentIndex, 1);
        this.m_Data.splice(newIndex, 0, recipeToMove);
    }


    swap(id1: number, id2: number): void
    {
        const recipe1 = this.m_Data.find((recipe) => recipe.id === id1);
        const recipe2 = this.m_Data.find((recipe) => recipe.id === id2);
        
        if (!recipe1 || !recipe2)
            return;

        let index1 = this.m_Data.indexOf(recipe1);
        let index2 = this.m_Data.indexOf(recipe2);

        [this.m_Data[index1], this.m_Data[index2]] = [this.m_Data[index2], this.m_Data[index1]];
    }


    print(): string
    {
        let content: string = "";

        for (let i = 0; i < this.m_Data.length - 1; i++) 
        {     
            content += this.m_Data[i].printShort() + "\n";
        }

        content += this.m_Data[this.m_Data.length - 1].printShort();
        
        return content;
    }

    printPresent(): string
    {
        let content: string = "";

        for (let i = 0; i < this.m_Data.length - 1; i++) 
        {     
            if(this.m_Data[i].number > 0)
                content += this.m_Data[i].printShort() + "\n";
        }

        if(this.m_Data[this.m_Data.length - 1].number > 0)
            content += this.m_Data[this.m_Data.length - 1].printShort();
        
        return content;
    }


    copyRecipies(): void
    {
        navigator.clipboard.writeText(this.printPresent()).then(() => {}, () => {alert("coping failed")});
    }

    getPresentArray(): Recipe[]
    {
        const present: Recipe[] = [];

        this.m_Data.forEach((recipe) =>
        {
            if( recipe.number > 0 )
                present.push(recipe);
        });
        
        return present;
    }

    getSortedArray(): Recipe[]
    {
        const present: Recipe[] = [];
        const absent: Recipe[] = [];

        this.m_Data.forEach((recipe) =>
        {
            if( recipe.number > 0 )
                present.push(recipe);
            else
                absent.push(recipe);
        });
        
        return present.concat(absent);
        //return [...present, ...absent];
        //present.push(...absent); return present
    }

    getSearch(word: string): Recipe[]
    {
        word = word.toLowerCase().replace(/\s/g, "");

        return this.m_Data.filter((recipe) => 
        {
          const name = recipe.name.toLowerCase().replace(/\s/g, "");
          const tags = recipe.tags.toLowerCase().replace(/\s/g, "");
      
          return name.includes(word) || tags.includes(word);
        });
    }

    getSearchSorted(word: string): Recipe[]
    {
        const w = word.toLowerCase().replace(/\s/g, "");
      
        const filteredProducts = this.m_Data.filter((product) => 
        {
            const name = product.name.toLowerCase().replace(/\s/g, "");
            const tags = product.tags.toLowerCase().replace(/\s/g, "");
      
            return name.includes(w) || tags.includes(w);
        });
      
        filteredProducts.sort((a, b) => 
        {
            if (a.number > 0 && b.number === 0)
                return -1;
            else if (a.number === 0 && b.number > 0)
                return 1;
            else 
                return 0;
        });
      
        return filteredProducts;
    }


    flatline()
    {
        this.m_Data.forEach(recipe => { recipe.number = 0});
    }

    applyTNumber()
    {
        this.productMapHandle.forEach(product =>
        {
            product.Number += product.tNumber; 
            product.tNumber = 0
        })

        this.m_Data.forEach(recipe => { recipe.number = 0});
    }


    save(): void 
    {
        LStorage.getInstance().setObject(this);
    }

    reset(): void
    {
        this.m_Data = [];
    }
}