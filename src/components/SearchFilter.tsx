export default function SearchFilter({ onChangeHandler, onChangeFilter }: {
        onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
        onChangeFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;

}) {

        //form should have bading , flex row 
        //input should take most of the width of the form
        //button and input should have same hieght
        return (
                <form className="flex flex-row gap-2 p-4 bg-gray-800 rounded-lg mb-6">
                        <input type="search" onChange={onChangeHandler} className="flex-1 h-10 px-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400" />
                        <select onChange={onChangeFilter} className="h-10 px-3 bg-gray-700 border border-gray-600 rounded text-white">
                                <option value={"all"}>
                                        all
                                </option>
                                <option value={"open"}>
                                        open
                                </option>
                                <option value={"closed"}>
                                        closed
                                </option>
                        </select>
                </form>
        )
}

