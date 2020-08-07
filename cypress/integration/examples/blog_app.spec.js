describe('Blog App',function() {
    beforeEach(function() {
        cy.request('POST','http://localhost:3003/api/testing/reset')
        const user = {
            username: 'Yuvi',
            name: 'Yuvaraj',
            password: 'madrid'
        }
        cy.request('POST','http://localhost:3003/api/users',user)
        cy.visit('http://localhost:3000')
    })
    it('front page can be opened', function() {
        cy.visit('http://localhost:3000')
        cy.contains('Blog App')
    })
    it('Login form is shown', function() {
        cy.contains('login').click()
        cy.contains('Username')
        cy.contains('Password')
    })
    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('Yuvi')
            cy.get('#password').type('madrid')
            cy.get('#login').click()

            cy.contains('Yuvaraj logged in')
        })
    
        describe('Login with wrong credentials', function() {
            beforeEach(function() {
                cy.contains('login').click()
                cy.get('#username').type('Yuvi')
                cy.get('#password').type('wrong')
                cy.get('#login').click()
            })
            it('fails with wrong credentials', function() {
                cy.contains('Wrong Credentials')
            })
            it('displays error message', function() {
                cy.contains('Wrong Credentials').as('theMessage')
                cy.get('@theMessage').should('have.css','color','rgb(255, 0, 0)')
            })
        })
    })
    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'Yuvi', password: 'madrid' })

            cy.contains('Yuvaraj logged in')

            cy.createBlog({
                title: 'New blog',
                author: 'Author',
                url: 'blog.com',
                likes: 60
            })
        })
    
        it('A blog can be created', function() {
            cy.contains('New blog Author')
        })
        describe('Changes by user', function() {
            beforeEach( function() {
                cy.contains('New blog Author').contains('View').click()
            })
            it('User can like a blog', function() {
                cy.contains(0).get('.like').click()
                cy.contains(1)
            })
            it('User can delete a blog', function() {
                cy.get('#remove').click()
                cy.get('html').should('not.contain', 'New Blog Author')
            })
            it('Other users cannot delete the blogs they did not create', function() {
                cy.get('#logout').click()
                const user = {
                    username: 'Vicky',
                    name: 'Vignesh',
                    password: 'balaji'
                }
                cy.request('POST','http://localhost:3003/api/users',user)
                cy.login({
                    username: 'Vicky',
                    password: 'balaji'
                })
                cy.contains('Vignesh logged in')
                cy.contains('New blog Author').contains('View').click()
                cy.get('.togglableContent').should('not.contain','delete')
            })
        })
        describe('when there are more blogs', function() {
            beforeEach(function() {
                cy.createBlog({
                    title: 'Blog2',
                    author: 'Author2',
                    url: 'blog2.com',
                    likes: 65
                })
                cy.createBlog({
                    title: 'Blog3',
                    author: 'Author3',
                    url: 'blog3.com',
                    likes: 66
                })
            })
            it('blogs sorted by likes',function() {
                cy.get('.likes').then(likes => {
                    function checkSort(arr) {
                        let temp = 1
                        for(let i = 0; i < arr.length - 1; i++) {
                            if(arr[i] > arr[i+1]) {
                                temp = 1
                            } else {
                                temp = 0
                            }
                        }
                        return temp
                    }

                    const likesOfBlogs = []
                    for(let i = 0; i< likes.length; i++) {
                        likesOfBlogs.push(likes[i].textContent)
                    }
                    expect(checkSort(likesOfBlogs)).to.eq(1)
                })
            })
        })
    })
})