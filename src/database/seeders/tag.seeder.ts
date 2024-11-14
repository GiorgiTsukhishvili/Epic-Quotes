import { tagFactory } from '../factories/tag.factory'

const movieTags = [
  { en: 'Action', ka: 'ექშენი' },
  { en: 'Adventure', ka: 'სათავგადასავლო' },
  { en: 'Animation', ka: 'ანიმაცია' },
  { en: 'Comedy', ka: 'კომედია' },
  { en: 'Crime', ka: 'კრიმინალი' },
  { en: 'Documentary', ka: 'დოკუმენტური' },
  { en: 'Drama', ka: 'დრამა' },
  { en: 'Fantasy', ka: 'ფანტასტიკა' },
  { en: 'Horror', ka: 'საშინელებათა' },
  { en: 'Musical', ka: 'მუსიკალური' },
  { en: 'Mystery', ka: 'მისტიკა' },
  { en: 'Romance', ka: 'რომანტიკა' },
  { en: 'Sci-Fi', ka: 'მეცნიერული ფანტასტიკა' },
  { en: 'Thriller', ka: 'თრილერი' },
  { en: 'War', ka: 'ომი' },
  { en: 'Western', ka: 'ვესტერნი' },
]

export const tagSeeder = async () => {
  try {
    for (let tag of movieTags) {
      await tagFactory(tag)
    }

    console.log('\x1b[32mMovie tags seed is complete\x1b[32m')
  } catch (err) {
    console.log(err)
  }
}
