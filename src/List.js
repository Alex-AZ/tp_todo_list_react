import React, {Component} from 'react';

class List extends Component {
    handleCheck = event => {
        this.props.checkTache(parseInt(event.target.getAttribute("data-index")));
    };

    render() {
        const tachesLi = this.props.taches.map((tache, tacheIndex) => {
            const liClass = tache.checked ? "checkedLi" : "";
            return (
                <li key={tacheIndex} className={liClass}>
                    <input
                        type="checkbox"
                        data-index={tacheIndex}
                        onChange={this.handleCheck}
                        checked={tache.checked}
                    />
                    {tache.name}
                </li>
            );
        });

        return <ul>{tachesLi}</ul>;
    }
}

export default List;
