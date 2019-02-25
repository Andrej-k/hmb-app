export class HmbUtils {
    /**
     * Filter array by string
     *
     */
    public static filterArrayByString(mainArr: any[], searchText: string, propsToSearch?: string[]): any[] {
        if (!mainArr) {
            return [];
        }

        if (!searchText) {
            return mainArr;
        }

        console.log('mainArr');
        console.log(mainArr);

        const searchTerms = searchText.toLowerCase().split(' ');

        return mainArr.filter(itemObj => {
            let doesMatch = true;

            console.log('searchTerms');
            console.log(searchTerms);

            searchTerms.forEach(searchTerm => {
                if (doesMatch) {
                    doesMatch = HmbUtils.searchInObj(itemObj, searchTerm, propsToSearch);
                }
            });

            return doesMatch;
        });
    }

    /**
     * Search in object
     *
     */
    public static searchInObj(itemObj: any, searchText: string, propsToSearch?: string[]): boolean {
        for (const prop in itemObj) {
            if (!itemObj.hasOwnProperty(prop)) {
                continue;
            }

            if (propsToSearch && propsToSearch.indexOf(prop) === -1) {
                continue;
            }

            const value = itemObj[prop];

            console.log('value');
            console.log(value);

            if (typeof value === 'string') {
                if (this.searchInString(value, searchText)) {
                    console.log(this.searchInString(value, searchText));
                    return true;
                }
            } else if (Array.isArray(value)) {
                if (this.searchInArray(value, searchText, propsToSearch)) {
                    return true;
                }
            }

            if (typeof value === 'object') {
                if (this.searchInObj(value, searchText, propsToSearch)) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Search in array
     *
     */
    public static searchInArray(arr: any[], searchText: string, propsToSearch?: string[]): boolean {
        for (const value of arr) {
            if (typeof value === 'string') {
                if (this.searchInString(value, searchText)) {
                    return true;
                }
            }

            if (typeof value === 'object') {
                if (this.searchInObj(value, searchText, propsToSearch)) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Search in string
     *
     */
    public static searchInString(value: string, searchText: string): any {
        console.log('stringgggg');
        console.log(value);
        console.log(searchText);
        return value.toLowerCase().indexOf(searchText) !== -1;
    }

    /**
     * capitalizeFirstCharacter
     *
     */
    public static capitalizeFirstCharacter(text: string): string {
        if (!text) {
            return '';
        }

        return text.charAt(0).toUpperCase() + text.substr(1);
    }
}
