import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"


export const apiSlice = createApi({
    reducerPath:"apiSlice",
    baseQuery: fetchBaseQuery({baseUrl: 'https://629743ae14e756fe3b2c203f.mockapi.io/'}),
    tagTypes: ['User'],
    endpoints: (builder)=>({
        getUsers: builder.query({
            query: ()=> '/users',
            providesTags: (result, error, arg) =>
            result
              ? [...result.map(({ id }) => ({ type: 'User', id })), 'User']
              : ['User'],
        }),
        addUser: builder.mutation({
            query:(data)=>({
                url: '/users',
                method:'POST',
                body: data
            }),
            invalidatesTags: ['User'],
        }),
        editUser: builder.mutation({
            query: (data) =>({
                url: `/users/${data.id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation({
            query:(id) =>({
                url: `/users/${id}`,
                method: "DELETE",
                body: id
            }),
            invalidatesTags: ['User']
        })
    })
})

export const {useGetUsersQuery, useAddUserMutation,useEditUserMutation, useDeleteUserMutation} = apiSlice;