import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';

class SongList extends Component {

    renderSongs() {
        return this.props.data.songs.map(song => {
            return (
                <div key={song.id} className="collection-item">
                    {song.title}
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


export default graphql(query)(SongList);