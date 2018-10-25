import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

class SongList extends Component {

    onSongDelete(id) {
        this.props.mutate({
            variables: {
                id
            }
        }).then(() => this.props.data.refetch());
    }

    renderSongs() {
        return this.props.data.songs.map(song => {
            return (
                <div key={song.id} className="collection-item">
                    {song.title}
                    <i className="material-icons"
                    onClick={() => this.onSongDelete(song.id)}>delete</i>
                </div>
            );
        })
    }

    render() {

        if(this.props.data.loading) {
            return <div>Loading....</div>
        }

        return ( 
            <div>
            <div className="collection">
                {this.renderSongs()}
            </div>
            <Link to="/song/new"
            className="btn-floating btn-large red right"
            >
                <i className="material-icons">add</i>
            </Link> 
            </div>
        );
    }
}

const query = gql`
    {
        songs {
            id
            title
        }
    }
`;

const mutation = gql`
    mutation deleteSong($id: ID) {
        deleteSong(id: $id) {
            id
        }
    }
`;

export default graphql(mutation)(
    graphql(query)(SongList)
);