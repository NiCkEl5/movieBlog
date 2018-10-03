# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
movies = Movie.create([{ title: 'Star Wars', description: 'In a galaxy far, far away', rating: 5, category: 'SCI-FI' }, { title: 'Lord of the Rings', description: 'Protect the shire', rating: 5 , category: 'SCI-FI'}])