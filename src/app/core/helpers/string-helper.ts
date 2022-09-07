export class StringHelper {
    public static removeSpaces(input: string): string {
        return input.trim();
    }

    /**
     * Sanitize string ponctuation according language
     * @param input String to sanitize
     * @param locale Language to use to sanitize
     * 
     * @returns string input with correct ponctuation
     * 
     * @usage
     *  input => La méthode s'utilise de la manière suivante: sanitize
     *  locale => fr
     *  Must return : La méthode s'utilise de la manière suivante : santize
     *  locale => us
     *  Must return : La méthode s'utilise de la manière suivante: sanitize
     * 
     * French language 
     *  => : | ; One space before, One space after
     *  => ,|. One space after
     * English languages 
     *  => : | ; One space after only
     *  => ,|. One space after
     */
    public static sanitizePonctuation(input: string, locale?: string): string {
        return '';
    }

    /**
     * Sanitize compound firstname (i.e Jean Luc => Jean-Luc)
     * @param firstname 
     * @returns string firstname correctly spelled
     */
    public static sanitizeFirstName(firstname: string): string {
        return '';
    }

    /**
     * Remove unexpected chars before and after a string
     *  i.e !_ Pierre Blin *- => Pierre Blin
     * @param value String to sanitize
     * @param regexp RegExp containing unexpected chars before and after string
     * @returns 
     */
    public static removeUnexpectedChars(value: string, regexp: RegExp): string {
        return '';
    }
}