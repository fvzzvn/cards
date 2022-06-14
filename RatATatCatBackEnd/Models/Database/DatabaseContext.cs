using Microsoft.EntityFrameworkCore;


namespace RatATatCatBackEnd.Models.Database
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

        public virtual DbSet<UserInfo>? UserInfos { get; set; }
        public virtual DbSet<BoardInstance>? BoardInstances { get; set; }

        public virtual DbSet<Participant> Participants { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserInfo>(entity =>
            {
                //entity.HasNoKey();
                entity.ToTable("UserInfo");
                entity.Property(e => e.UserId).HasColumnName("UserId");
                entity.Property(e => e.DisplayName).HasMaxLength(60).IsUnicode(false);
                entity.Property(e => e.UserName).HasMaxLength(30).IsUnicode(false);
                entity.Property(e => e.Email).HasMaxLength(50).IsUnicode(false);
                entity.Property(e => e.Password).HasMaxLength(20).IsUnicode(false);
                entity.Property(e => e.Mmr);
                entity.Property(e => e.CreatedDate).IsUnicode(false);
                entity.Property(e => e.Role).HasMaxLength(50);
            });

            modelBuilder.Entity<BoardInstance>(entity =>
            {
                //entity.HasNoKey();
                entity.ToTable("Boards");
                entity.Property(e => e.Id).HasColumnName("Id");
                entity.Property(e => e.BoardType);
                entity.Property(e => e.BoardMode);
            });

            modelBuilder.Entity<Participant>(entity =>
            {
                entity.ToTable("Participants");
                entity.Property(e => e.ParticipantId);
                entity.Property(e => e.UserId);
                entity.Property(e => e.BoardId);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
