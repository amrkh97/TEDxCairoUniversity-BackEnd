class Entity{
    /**
     * Overload this in order to hide or calculate other properties that will be sent over the wire
     */
    get serializable(){
        return this;
    }
}
export default Entity;
