using Microsoft.EntityFrameworkCore;


namespace RatATatCatBackEnd.Models
{
    public partial class DatabaseContext : DbContext
    {
        public DatabaseContext()
        {
        }

        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<BoardInstance>? BoardInstances { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BoardInstance>(entity =>
            {
                //entity.HasNoKey();
                entity.ToTable("Boards");
                entity.Property(e => e.Id).HasColumnName("Id"); ;
                entity.Property(e => e.BoardType);
                entity.Property(e => e.BoardMode);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
