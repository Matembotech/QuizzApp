

const quizzes = [
  {
    id: 1,
    title: 'Data Science and Machine Learning with Python - Hands On!',
    author: 'Jason Williams',
    category: 'Science',
    duration: '08 hr 15 mins',
    questions: 29,
    price: '$385.00',
    oldPrice: '$440.00',
    rating: 4.9,
    imageGradient: 'from-blue-400 to-emerald-400'
  },
  {
    id: 2,
    title: 'Create Amazing Color Schemes for Your UX Design Projects',
    author: 'Pamela Foster',
    category: 'Science',
    duration: '08 hr 15 mins',
    questions: 29,
    price: '$420.00',
    rating: 4.9,
    imageGradient: 'from-pink-400 to-purple-400'
  },
  {
    id: 3,
    title: 'Culture & Leadership: Strategies for a Successful Business',
    author: 'Rose Simmons',
    category: 'Science',
    duration: '08 hr 15 mins',
    questions: 29,
    price: '$295.00',
    oldPrice: '$340.00',
    rating: 4.9,
    imageGradient: 'from-amber-400 to-orange-500'
  },
  {
    id: 4,
    title: 'Finance Series: Learn to Budget and Calculate your Net Worth.',
    author: 'Jason Williams',
    category: 'Finance',
    duration: '08 hr 15 mins',
    questions: 29,
    price: 'Free',
    rating: 4.9,
    imageGradient: 'from-teal-400 to-emerald-500'
  },
  {
    id: 5,
    title: 'Build Brand Into Marketing: Tackling the New Marketing Landscape',
    author: 'Jason Williams',
    category: 'Marketing',
    duration: '08 hr 15 mins',
    questions: 29,
    price: '$136.00',
    rating: 4.9,
    imageGradient: 'from-indigo-400 to-cyan-400'
  },
  {
    id: 6,
    title: 'Graphic Design: Illustrating Badges and Icons with Geometric Shapes',
    author: 'Jason Williams',
    category: 'Design',
    duration: '08 hr 15 mins',
    questions: 29,
    price: '$237.00',
    rating: 4.9,
    imageGradient: 'from-rose-400 to-red-500'
  }
];

const FeaturedQuizzes = () => {
  return (
    <section className="py-12 px-6 lg:px-20 bg-surface">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-surface-container-low rounded-[2rem] p-4 flex flex-col gap-4 ghost-border hover:bg-secondary-container/20 transition-colors group cursor-pointer">
            {/* Image Placeholder */}
            <div className={`w-full h-48 rounded-2xl bg-gradient-to-tr ${quiz.imageGradient} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
            
            <div className="flex justify-between items-center px-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-xs font-bold text-primary">
                  {quiz.author.charAt(0)}
                </div>
                <span className="text-sm font-medium text-on-surface-variant">{quiz.author}</span>
              </div>
              <span className="px-3 py-1 bg-surface-container-high text-primary text-xs font-medium rounded-full">
                {quiz.category}
              </span>
            </div>

            <h3 className="font-display font-bold text-lg text-on-surface leading-tight px-2 group-hover:text-primary transition-colors line-clamp-2">
              {quiz.title}
            </h3>

            <div className="flex items-center gap-6 text-sm text-on-surface-variant px-2 border-b border-outline-variant/20 pb-4">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {quiz.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                {quiz.questions} Questions
              </span>
            </div>

            <div className="flex justify-between items-center px-2 pt-2">
              <div className="flex items-center gap-2">
                <span className={`font-bold text-lg ${quiz.price === 'Free' ? 'text-secondary' : 'text-on-surface'}`}>
                  {quiz.price}
                </span>
                {quiz.oldPrice && (
                  <span className="text-sm text-on-surface-variant line-through">{quiz.oldPrice}</span>
                )}
              </div>
              
              <div className="flex items-center gap-1 text-sm font-medium text-on-surface">
                {quiz.rating}
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button className="px-8 py-3 rounded-xl font-medium text-primary border border-primary hover:bg-surface-container-high transition-colors">
          Other Quizzes
        </button>
      </div>
    </section>
  );
};

export default FeaturedQuizzes;
